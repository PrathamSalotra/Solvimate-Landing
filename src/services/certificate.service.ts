import Certificate from "@/models/Certificate";
import dbConnect from "@/lib/mongodb";

export interface CreateCertificateInput {
  verificationId: string;
  candidateName: string;
  candidatePhoto?: string;
  email: string;
  phone?: string;
  internshipRole: string;
  department: string;
  organization: string;
  issueDate: Date | string;
  startDate?: Date | string;
  endDate?: Date | string;
  duration?: string;
  description?: string;
  badges?: string[];
  status?: string;
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  cloudinaryPublicId?: string;
}

export interface ListCertificatesOptions {
  page?: number;
  limit?: number;
  status?: string;
  query?: string;
}

function normalizeVerificationId(verificationId: string) {
  const normalized = verificationId.trim().toUpperCase();
  if (!normalized) {
    throw new Error("verificationId is required.");
  }
  return normalized;
}

function parseDate(value: any, fieldName: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid ${fieldName}.`);
  }
  return parsed;
}

function normalizeBadges(badges?: string[]) {
  if (!badges) {
    return [];
  }
  return Array.from(new Set(badges.map((badge) => badge.trim()).filter(Boolean)));
}

export async function getCertificateById(verificationId: string) {
  const normalizedId = normalizeVerificationId(verificationId);
  await dbConnect();
  return Certificate.findOne({ verificationId: normalizedId });
}

export async function listCertificates(options: ListCertificatesOptions = {}) {
  const page = Number.isFinite(options.page) ? Math.max(1, options.page ?? 1) : 1;
  const limit = Number.isFinite(options.limit)
    ? Math.min(100, Math.max(1, options.limit ?? 20))
    : 20;
  const skip = (page - 1) * limit;

  await dbConnect();
  const filter: any = {};

  if (options.status) {
    filter.status = options.status;
  }
  if (options.query?.trim()) {
    const safeQuery = options.query.trim();
    filter.$or = [
      { verificationId: { $regex: safeQuery, $options: "i" } },
      { candidateName: { $regex: safeQuery, $options: "i" } },
      { email: { $regex: safeQuery, $options: "i" } },
      { internshipRole: { $regex: safeQuery, $options: "i" } },
      { organization: { $regex: safeQuery, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Certificate.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Certificate.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function createCertificate(input: CreateCertificateInput) {
  const verificationId = normalizeVerificationId(input.verificationId);
  const issueDate = parseDate(input.issueDate, "issueDate");
  if (!issueDate) {
    throw new Error("issueDate is required.");
  }

  await dbConnect();

  const existing = await Certificate.findOne({ verificationId }).select("_id");
  if (existing) {
    throw new Error("A certificate with this verificationId already exists.");
  }

  return Certificate.create({
    verificationId,
    candidateName: input.candidateName,
    candidatePhoto: input.candidatePhoto,
    email: input.email,
    phone: input.phone,
    internshipRole: input.internshipRole,
    department: input.department,
    organization: input.organization,
    issueDate,
    startDate: parseDate(input.startDate, "startDate"),
    endDate: parseDate(input.endDate, "endDate"),
    duration: input.duration,
    description: input.description,
    badges: normalizeBadges(input.badges),
    status: (input.status ?? "active") as "active" | "revoked",
    certificatePdfUrl: input.certificatePdfUrl,
    certificateImageUrl: input.certificateImageUrl,
    cloudinaryPublicId: input.cloudinaryPublicId,
  });
}

export async function updateCertificate(
  verificationId: string,
  updates: Partial<CreateCertificateInput>
) {
  const normalizedId = normalizeVerificationId(verificationId);
  await dbConnect();

  const updatePayload: any = {};
  if (updates.candidateName !== undefined) updatePayload.candidateName = updates.candidateName;
  if (updates.candidatePhoto !== undefined) updatePayload.candidatePhoto = updates.candidatePhoto;
  if (updates.email !== undefined) updatePayload.email = updates.email;
  if (updates.phone !== undefined) updatePayload.phone = updates.phone;
  if (updates.internshipRole !== undefined) updatePayload.internshipRole = updates.internshipRole;
  if (updates.department !== undefined) updatePayload.department = updates.department;
  if (updates.organization !== undefined) updatePayload.organization = updates.organization;
  if (updates.issueDate !== undefined) {
    updatePayload.issueDate = parseDate(updates.issueDate, "issueDate");
  }
  if (updates.startDate !== undefined) {
    updatePayload.startDate = parseDate(updates.startDate, "startDate");
  }
  if (updates.endDate !== undefined) {
    updatePayload.endDate = parseDate(updates.endDate, "endDate");
  }
  if (updates.duration !== undefined) updatePayload.duration = updates.duration;
  if (updates.description !== undefined) updatePayload.description = updates.description;
  if (updates.badges !== undefined) updatePayload.badges = normalizeBadges(updates.badges);
  if (updates.status !== undefined) updatePayload.status = updates.status;
  if (updates.certificatePdfUrl !== undefined) {
    updatePayload.certificatePdfUrl = updates.certificatePdfUrl;
  }
  if (updates.certificateImageUrl !== undefined) {
    updatePayload.certificateImageUrl = updates.certificateImageUrl;
  }
  if (updates.cloudinaryPublicId !== undefined) {
    updatePayload.cloudinaryPublicId = updates.cloudinaryPublicId;
  }

  const updated = await Certificate.findOneAndUpdate(
    { verificationId: normalizedId },
    { $set: updatePayload },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error("Certificate not found.");
  }
  return updated;
}

export async function recordCertificateVerification(verificationId: string, verifiedAt: Date) {
  const normalizedId = normalizeVerificationId(verificationId);
  await dbConnect();

  return Certificate.findOneAndUpdate(
    { verificationId: normalizedId, status: "active" },
    {
      $inc: { verificationCount: 1 },
      $set: { lastVerifiedAt: verifiedAt },
    },
    { new: true, runValidators: true }
  );
}
