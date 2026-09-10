import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import bcrypt from "bcryptjs";
import dbConnect from "../src/lib/mongodb";
import Admin from "../src/models/Admin";
import AdminLoginChallenge from "../src/models/AdminLoginChallenge";
import { resend } from "../src/lib/resend";
import {
  normalizeEmail,
  requestAdminLoginOtp,
  verifyAdminLoginWithOtp,
  syncWhitelistedAdminsFromEnv,
  AdminAuthError,
} from "../src/services/auth.service";
import { authOptions } from "../src/lib/auth";
import { POST as requestOtpRoute } from "../src/app/api/admin/auth/request-otp/route";
import { POST as resendResetOtpRoute } from "../src/app/api/admin/auth/resend-reset-otp/route";

const TEST_EMAIL_1 = "test-edge-1@solvimate.test";
const TEST_EMAIL_2 = "test-edge-2@solvimate.test";
const TEST_EMAIL_INACTIVE = "test-inactive@solvimate.test";
const TEST_PASSWORD_INITIAL = "StrongPass123!";
const TEST_PASSWORD_WRONG = "WrongPass999!";
const TEST_PASSWORD_SHORT = "short";

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    testsFailed++;
    console.error(`  ❌ FAIL: ${testName}${detail ? ` -> ${detail}` : ""}`);
  }
}

async function assertThrowsAsync(
  fn: () => Promise<any>,
  testName: string,
  expectedCode?: string,
  expectedStatus?: number
) {
  testsRun++;
  try {
    await fn();
    testsFailed++;
    console.error(`  ❌ FAIL: ${testName} -> Expected function to throw, but it succeeded.`);
  } catch (err: any) {
    const codeMatch = !expectedCode || err.code === expectedCode;
    const statusMatch = !expectedStatus || err.statusCode === expectedStatus;
    if (codeMatch && statusMatch) {
      testsPassed++;
      console.log(`  ✅ PASS: ${testName} (threw [${err.code || err.name}: ${err.statusCode || 500}])`);
    } else {
      testsFailed++;
      console.error(
        `  ❌ FAIL: ${testName} -> Threw code=${err.code}, status=${err.statusCode} (expected code=${expectedCode}, status=${expectedStatus})`
      );
    }
  }
}

async function cleanupTestData() {
  await Admin.deleteMany({ email: /@solvimate\.test$/ });
  await AdminLoginChallenge.deleteMany({ email: /@solvimate\.test$/ });
}

async function runAllEdgeCaseTests() {
  console.log("\n=======================================================");
  console.log("  STARTING COMPREHENSIVE PHASE 2 EDGE CASE TEST SUITE  ");
  console.log("=======================================================\n");

  await dbConnect();
  await cleanupTestData();

  // Mock Resend to avoid consuming live quota during edge-case tests
  let lastSentOtp = "";
  const originalSend = resend.emails.send.bind(resend.emails);
  (resend.emails as any).send = async (payload: any) => {
    // Extract OTP from html or text for testing validation
    const otpMatch = payload.text?.match(/admin sign-in: (\d{6})/);
    if (otpMatch) {
      lastSentOtp = otpMatch[1];
    }
    return { data: { id: "mock_resend_msg_id" }, error: null };
  };

  try {
    // -------------------------------------------------------------
    // GROUP 1: normalizeEmail edge cases
    // -------------------------------------------------------------
    console.log("[Group 1] normalizeEmail Edge Cases");
    assert(
      normalizeEmail("  Admin@SolviMate.COM  ") === "admin@solvimate.com",
      "Should trim whitespace and convert uppercase/mixed to lowercase"
    );
    try {
      normalizeEmail("   ");
      assert(false, "Should throw on empty or whitespace-only email");
    } catch {
      assert(true, "Should throw on empty or whitespace-only email");
    }

    // -------------------------------------------------------------
    // GROUP 2: Password strength & validation
    // -------------------------------------------------------------
    console.log("\n[Group 2] Password Validation on OTP Request");
    await assertThrowsAsync(
      () => requestAdminLoginOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_SHORT }),
      "Should reject password shorter than 8 characters",
      "INVALID_CREDENTIALS",
      400
    );

    // -------------------------------------------------------------
    // GROUP 3: Unauthorized & Inactive Email Access
    // -------------------------------------------------------------
    console.log("\n[Group 3] Unauthorized & Inactive Email Edge Cases");
    await assertThrowsAsync(
      () => requestAdminLoginOtp({ email: "unknown-hacker@solvimate.test", password: TEST_PASSWORD_INITIAL }),
      "Should reject unprovisioned non-whitelisted email",
      "UNAUTHORIZED",
      401
    );

    // Create an inactive admin
    await Admin.create({
      email: TEST_EMAIL_INACTIVE,
      name: "Inactive User",
      role: "manager",
      isActive: false,
      passwordHash: await bcrypt.hash(TEST_PASSWORD_INITIAL, 10),
    });

    await assertThrowsAsync(
      () => requestAdminLoginOtp({ email: TEST_EMAIL_INACTIVE, password: TEST_PASSWORD_INITIAL }),
      "Should reject inactive admin account",
      "UNAUTHORIZED",
      401
    );

    // -------------------------------------------------------------
    // GROUP 4: Provisioning & Password Check on requestAdminLoginOtp
    // -------------------------------------------------------------
    console.log("\n[Group 4] First-time Provisioned Admin (No initial password)");
    const admin1 = await Admin.create({
      email: TEST_EMAIL_1,
      name: "Edge Tester 1",
      role: "admin",
      isActive: true,
      // No passwordHash yet!
    });

    // Requesting OTP for admin without passwordHash should succeed and dispatch OTP
    const reqRes1 = await requestAdminLoginOtp({
      email: `  ${TEST_EMAIL_1.toUpperCase()}  `, // Test email normalization in request
      password: TEST_PASSWORD_INITIAL,
    });
    assert(Boolean(reqRes1.challengeId), "OTP request succeeds for admin with no prior passwordHash");
    assert(Boolean(lastSentOtp && lastSentOtp.length === 6), "Generated 6-digit OTP code");
    const capturedOtp1 = lastSentOtp;

    // -------------------------------------------------------------
    // GROUP 5: Rate Limiting & Cooldown
    // -------------------------------------------------------------
    console.log("\n[Group 5] Rate Limiting & Resend Cooldown");
    await assertThrowsAsync(
      () => requestAdminLoginOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_INITIAL }),
      "Should reject subsequent OTP request within 30s cooldown",
      "OTP_RATE_LIMITED",
      429
    );

    // -------------------------------------------------------------
    // GROUP 6: Incorrect Password for Admin with existing passwordHash
    // -------------------------------------------------------------
    console.log("\n[Group 6] Wrong Password Verification");
    const admin2 = await Admin.create({
      email: TEST_EMAIL_2,
      name: "Edge Tester 2",
      role: "super_admin",
      isActive: true,
      passwordHash: await bcrypt.hash(TEST_PASSWORD_INITIAL, 10),
    });

    await assertThrowsAsync(
      () => requestAdminLoginOtp({ email: TEST_EMAIL_2, password: TEST_PASSWORD_WRONG }),
      "Should reject wrong password with 401 INVALID_CREDENTIALS",
      "INVALID_CREDENTIALS",
      401
    );

    // -------------------------------------------------------------
    // GROUP 7: verifyAdminLoginWithOtp Edge Cases
    // -------------------------------------------------------------
    console.log("\n[Group 7] verifyAdminLoginWithOtp Edge Cases");
    
    // Edge case 7.1: Missing fields
    assert(
      (await verifyAdminLoginWithOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_INITIAL, otp: "", challengeId: reqRes1.challengeId })) === null,
      "Fails on empty OTP"
    );
    assert(
      (await verifyAdminLoginWithOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_INITIAL, otp: capturedOtp1, challengeId: "" })) === null,
      "Fails on empty challengeId"
    );
    assert(
      (await verifyAdminLoginWithOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_SHORT, otp: capturedOtp1, challengeId: reqRes1.challengeId })) === null,
      "Fails on short password"
    );
    assert(
      (await verifyAdminLoginWithOtp({ email: TEST_EMAIL_1, password: TEST_PASSWORD_INITIAL, otp: capturedOtp1, challengeId: "nonexistent_challenge_id" })) === null,
      "Fails on non-existent / invalid challengeId format"
    );

    // Edge case 7.2: Wrong OTP increments attempts
    const wrongOtpResult = await verifyAdminLoginWithOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: "000000", // deliberate wrong OTP
      challengeId: reqRes1.challengeId,
    });
    assert(wrongOtpResult === null, "Fails on wrong OTP");

    const challengeDoc = await AdminLoginChallenge.findById(reqRes1.challengeId);
    assert(challengeDoc?.attempts === 1, "Increments attempts count on failed OTP");

    // Edge case 7.3: Max attempts exhaustion (5 attempts max)
    for (let i = 2; i <= 5; i++) {
      await verifyAdminLoginWithOtp({
        email: TEST_EMAIL_1,
        password: TEST_PASSWORD_INITIAL,
        otp: "999999",
        challengeId: reqRes1.challengeId,
      });
    }
    const exhaustedDoc = await AdminLoginChallenge.findById(reqRes1.challengeId);
    assert(exhaustedDoc?.attempts === 5 && Boolean(exhaustedDoc?.consumedAt), "Consumes challenge when max attempts reached");

    // Attempting with the correct OTP after exhaustion should FAIL
    const postExhaustionTry = await verifyAdminLoginWithOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: capturedOtp1,
      challengeId: reqRes1.challengeId,
    });
    assert(postExhaustionTry === null, "Rejects even correct OTP after challenge is exhausted");

    // Edge case 7.4: Expired Challenge
    const expiredChallenge = await AdminLoginChallenge.create({
      adminId: admin1._id,
      email: TEST_EMAIL_1,
      otpHash: await bcrypt.hash("123456", 10),
      expiresAt: new Date(Date.now() - 1000 * 60 * 5), // expired 5 mins ago
      attempts: 0,
      purpose: "login",
    });
    const expiredTry = await verifyAdminLoginWithOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: "123456",
      challengeId: String(expiredChallenge._id),
    });
    assert(expiredTry === null, "Rejects expired challenge");
    const reloadedExpired = await AdminLoginChallenge.findById(expiredChallenge._id);
    assert(Boolean(reloadedExpired?.consumedAt), "Expired challenge marked consumed on attempt");

    // -------------------------------------------------------------
    // GROUP 8: Successful Login & First-Login Password Provisioning
    // -------------------------------------------------------------
    console.log("\n[Group 8] Successful Login & First-Login Password Setting");
    // Reset cooldown on admin1 so we can issue a fresh challenge
    await Admin.findByIdAndUpdate(admin1._id, { $unset: { lastOtpSentAt: 1 } });
    const freshReq = await requestAdminLoginOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
    });
    const freshOtp = lastSentOtp;

    // Check old challenge was invalidated/consumed when fresh was issued
    const activeChallengesCount = await AdminLoginChallenge.countDocuments({
      adminId: admin1._id,
      consumedAt: { $exists: false },
    });
    assert(activeChallengesCount === 1, "Only one challenge active at a time; previous ones invalidated");

    // Verify successfully
    const verifiedAdmin = await verifyAdminLoginWithOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: freshOtp,
      challengeId: freshReq.challengeId,
    });
    assert(Boolean(verifiedAdmin && verifiedAdmin.email === TEST_EMAIL_1), "Verification succeeds with correct OTP");

    // Check that admin1 now has a permanent passwordHash saved!
    const reloadedAdmin1 = await Admin.findById(admin1._id).select("+passwordHash");
    assert(Boolean(reloadedAdmin1?.passwordHash), "First-time login saves permanent passwordHash");
    const isSavedPasswordMatch = await bcrypt.compare(TEST_PASSWORD_INITIAL, reloadedAdmin1?.passwordHash || "");
    assert(isSavedPasswordMatch, "Saved passwordHash matches provided password");

    // Replay attack: Re-using the same challengeId should fail immediately
    const replayTry = await verifyAdminLoginWithOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: freshOtp,
      challengeId: freshReq.challengeId,
    });
    assert(replayTry === null, "Replay attack prevented: Consumed challenge cannot be re-used");

    // -------------------------------------------------------------
    // GROUP 9: NextAuth Configuration & Callback Propagation
    // -------------------------------------------------------------
    console.log("\n[Group 9] NextAuth Config, authorize(), jwt(), and session() Callbacks");
    const credentialsProvider = authOptions.providers.find((p) => p.id === "credentials") as any;
    assert(Boolean(credentialsProvider), "NextAuth CredentialsProvider is configured");
    const authorizeFn = credentialsProvider.options?.authorize || credentialsProvider.authorize;

    // authorize() with missing credentials
    const nullAuth1 = await authorizeFn({ email: "", password: "", otp: "", challengeId: "" });
    assert(nullAuth1 === null, "authorize() returns null on missing fields");

    // authorize() with valid credentials (issue fresh challenge first)
    await Admin.findByIdAndUpdate(admin1._id, { $unset: { lastOtpSentAt: 1 } });
    const authReq = await requestAdminLoginOtp({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
    });
    const authOtp = lastSentOtp;

    const authorizedUser = await authorizeFn({
      email: TEST_EMAIL_1,
      password: TEST_PASSWORD_INITIAL,
      otp: authOtp,
      challengeId: authReq.challengeId,
    });
    assert(
      Boolean(authorizedUser && authorizedUser.role === "admin" && authorizedUser.email === TEST_EMAIL_1),
      "authorize() successfully resolves user with role and id",
      JSON.stringify(authorizedUser)
    );

    // Test JWT callback token enrichment
    const dummyUser = { id: "admin_id_123", email: TEST_EMAIL_1, name: "Admin", role: "super_admin" };
    const jwtResult = await (authOptions.callbacks?.jwt as any)({
      token: { sub: "sub_1" },
      user: dummyUser,
    });
    assert(
      jwtResult.id === "admin_id_123" && jwtResult.role === "super_admin",
      "jwt callback propagates user.id and user.role to token"
    );

    // Test Session callback token enrichment
    const sessionResult = await (authOptions.callbacks?.session as any)({
      session: { user: { email: TEST_EMAIL_1 } },
      token: { id: "admin_id_123", role: "super_admin" },
    });
    assert(
      sessionResult.user.id === "admin_id_123" && sessionResult.user.role === "super_admin",
      "session callback propagates token.id and token.role to session.user"
    );

    // -------------------------------------------------------------
    // GROUP 10: API Route Handlers Edge Cases
    // -------------------------------------------------------------
    console.log("\n[Group 10] API Routes (/api/admin/auth/request-otp & resend-reset-otp)");
    
    // Request OTP route - missing body
    const reqMissing = new Request("http://localhost:3000/api/admin/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email: "" }),
      headers: { "Content-Type": "application/json" },
    });
    const resMissing = await requestOtpRoute(reqMissing);
    assert(resMissing.status === 400, "request-otp route returns 400 on missing credentials");

    // Request OTP route - invalid credentials
    const reqBad = new Request("http://localhost:3000/api/admin/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email: "unknown@solvimate.test", password: "SomePassword123!" }),
      headers: { "Content-Type": "application/json" },
    });
    const resBad = await requestOtpRoute(reqBad);
    assert(resBad.status === 401, "request-otp route returns 401 on unauthorized admin");

    // Resend reset OTP route - missing email
    const resendMissing = new Request("http://localhost:3000/api/admin/auth/resend-reset-otp", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    const resendMissingRes = await resendResetOtpRoute(resendMissing);
    assert(resendMissingRes.status === 400, "resend-reset-otp returns 400 on missing email");

    // Resend reset OTP route - unknown admin
    const resendUnknown = new Request("http://localhost:3000/api/admin/auth/resend-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email: "ghost@solvimate.test" }),
      headers: { "Content-Type": "application/json" },
    });
    const resendUnknownRes = await resendResetOtpRoute(resendUnknown);
    assert(resendUnknownRes.status === 401, "resend-reset-otp returns 401 on unknown email");

    // Resend reset OTP route - rate limited admin
    await Admin.findByIdAndUpdate(admin1._id, { $set: { lastOtpSentAt: new Date() } });
    const resendRateLimited = new Request("http://localhost:3000/api/admin/auth/resend-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email: TEST_EMAIL_1 }),
      headers: { "Content-Type": "application/json" },
    });
    const resendRateLimitedRes = await resendResetOtpRoute(resendRateLimited);
    assert(resendRateLimitedRes.status === 429, "resend-reset-otp returns 429 when on cooldown");
  } finally {
    // Restore original resend function
    (resend.emails as any).send = originalSend;
    // Cleanup temporary test admins & challenges
    await cleanupTestData();
  }

  console.log("\n=======================================================");
  console.log(`  EDGE CASE TESTS SUMMARY: ${testsPassed}/${testsRun} PASSED (${testsFailed} FAILED)`);
  console.log("=======================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllEdgeCaseTests().catch((err) => {
  console.error("FATAL TEST RUNNER ERROR:", err);
  process.exit(1);
});
