import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import dbConnect from "@/lib/mongodb";
import { renderAdminOtpEmail } from "@/lib/emails/admin-otp";
import { FROM, resend } from "@/lib/resend";
import Admin from "@/models/Admin";
import AdminLoginChallenge from "@/models/AdminLoginChallenge";

const PASSWORD_MIN_LENGTH = Number(process.env.ADMIN_PASSWORD_MIN_LENGTH ?? 8);
const OTP_LENGTH = Number(process.env.ADMIN_OTP_LENGTH ?? 6);
const OTP_EXPIRY_MINUTES = Number(process.env.ADMIN_OTP_EXPIRY_MINUTES ?? 10);
const OTP_MAX_ATTEMPTS = Number(process.env.ADMIN_OTP_MAX_ATTEMPTS ?? 5);
const OTP_RESEND_COOLDOWN_SECONDS = Number(process.env.ADMIN_OTP_RESEND_COOLDOWN_SECONDS ?? 30);
const BCRYPT_SALT_ROUNDS = 10;

export class AdminAuthError extends Error {
  constructor(public code: string, message: string, public statusCode: number) {
    super(message);
    this.name = "AdminAuthError";
  }
}

export function normalizeEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    throw new Error("Email is required.");
  }
  return normalized;
}

function readWhitelistFromEnv(): string[] {
  const raw = process.env.ADMIN_WHITELISTED_EMAILS?.trim() || process.env.ADMIN_WHITELIST?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function isPasswordStrong(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH;
}

function generateNumericOtp(length: number): string {
  let otp = "";
  for (let index = 0; index < length; index += 1) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
}

async function sendAdminOtpEmail(email: string, otp: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  const template = renderAdminOtpEmail({
    email,
    otp,
    expiresInMinutes: OTP_EXPIRY_MINUTES,
  });
  
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Solvimate Admin OTP Code",
    html: template.html,
    text: template.text,
  });
  
  if (error) {
    console.error("Resend API Error:", error);
    throw new Error(error.message || "Unable to send OTP email.");
  }
}

function hasOtpResendCooldown(lastOtpSentAt: Date | undefined, now: Date): boolean {
  if (!lastOtpSentAt) return false;
  const elapsedMs = now.getTime() - lastOtpSentAt.getTime();
  return elapsedMs < OTP_RESEND_COOLDOWN_SECONDS * 1000;
}

export async function syncWhitelistedAdminsFromEnv() {
  await dbConnect();
  const whitelistEmails = readWhitelistFromEnv();
  if (whitelistEmails.length === 0) return;

  await Promise.all(
    whitelistEmails.map(async (email) => {
      await Admin.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            email,
            role: "manager",
            isActive: true,
          },
        },
        {
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );
    })
  );
}

export async function requestAdminLoginOtp(input: any) {
  await syncWhitelistedAdminsFromEnv();
  const normalizedEmail = normalizeEmail(input.email);
  const password = input.password ?? "";

  if (!isPasswordStrong(password)) {
    throw new AdminAuthError(
      "INVALID_CREDENTIALS",
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      400
    );
  }

  const admin = await Admin.findOne({ email: normalizedEmail, isActive: true }).select("+passwordHash");
  if (!admin) {
    throw new AdminAuthError("UNAUTHORIZED", "This email is not authorized for Solvimate admin access.", 401);
  }

  if (admin.passwordHash) {
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new AdminAuthError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
    }
  }

  const now = new Date();
  if (hasOtpResendCooldown(admin.lastOtpSentAt, now)) {
    throw new AdminAuthError(
      "OTP_RATE_LIMITED",
      `Please wait ${OTP_RESEND_COOLDOWN_SECONDS} seconds before requesting another OTP.`,
      429
    );
  }

  // Invalidate pending login challenges
  await AdminLoginChallenge.updateMany(
    {
      adminId: admin._id,
      email: normalizedEmail,
      purpose: "login",
      consumedAt: { $exists: false },
    },
    { $set: { consumedAt: now } }
  );

  const otp = generateNumericOtp(OTP_LENGTH);
  const otpHash = await bcrypt.hash(otp, BCRYPT_SALT_ROUNDS);
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const challenge = await AdminLoginChallenge.create({
    adminId: admin._id,
    email: normalizedEmail,
    otpHash,
    expiresAt,
    attempts: 0,
    purpose: "login",
  });

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n=========================================`);
      console.log(`[DEVELOPMENT] Admin Login OTP for ${normalizedEmail}: ${otp}`);
      console.log(`=========================================\n`);
    }
    await sendAdminOtpEmail(normalizedEmail, otp);
  } catch (error) {
    await AdminLoginChallenge.findByIdAndDelete(challenge._id);
    throw new AdminAuthError(
      "OTP_SEND_FAILED",
      error instanceof Error ? error.message : "Unable to send OTP email.",
      500
    );
  }

  admin.lastOtpSentAt = now;
  await admin.save();

  return {
    challengeId: String(challenge._id),
    expiresAt: expiresAt.toISOString(),
    message: "OTP sent successfully",
  };
}

export async function verifyAdminLoginWithOtp(input: any) {
  await syncWhitelistedAdminsFromEnv();
  const normalizedEmail = normalizeEmail(input.email);
  const password = input.password ?? "";
  const otp = (input.otp ?? "").trim();
  const challengeId = (input.challengeId ?? "").trim();

  if (!challengeId || !otp || !isPasswordStrong(password)) {
    return null;
  }

  const admin = await Admin.findOne({ email: normalizedEmail, isActive: true }).select("+passwordHash");
  if (!admin) {
    return null;
  }

  if (admin.passwordHash) {
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return null;
    }
  }

  let challenge = null;
  try {
    challenge = await AdminLoginChallenge.findOne({
      _id: challengeId,
      adminId: admin._id,
      email: normalizedEmail,
      purpose: "login",
      consumedAt: { $exists: false },
    }).select("+otpHash");
  } catch {
    return null;
  }

  if (!challenge) {
    return null;
  }

  const now = new Date();
  if (challenge.expiresAt.getTime() <= now.getTime()) {
    challenge.consumedAt = now;
    await challenge.save();
    return null;
  }

  if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
    challenge.consumedAt = now;
    await challenge.save();
    return null;
  }

  const isOtpValid = await bcrypt.compare(otp, challenge.otpHash as string);
  if (!isOtpValid) {
    challenge.attempts += 1;
    if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
      challenge.consumedAt = now;
    }
    await challenge.save();
    return null;
  }

  challenge.consumedAt = now;
  challenge.attempts += 1;
  await challenge.save();

  // First-login provisioning
  if (!admin.passwordHash) {
    admin.passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    admin.passwordUpdatedAt = now;
    await admin.save();
  }

  return admin;
}
