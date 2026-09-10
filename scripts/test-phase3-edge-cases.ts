import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import AdminLoginPage, { sanitizeCallbackUrl } from "../src/app/admin/login/page";

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

async function runPhase3EdgeCaseTests() {
  console.log("\n=======================================================");
  console.log("  STARTING COMPREHENSIVE PHASE 3 EDGE CASE TEST SUITE  ");
  console.log("=======================================================\n");

  // -------------------------------------------------------------
  // GROUP 1: Server Page & Redirection Logic
  // -------------------------------------------------------------
  console.log("[Group 1] Server Page (src/app/admin/login/page.tsx) Session Checks");

  // In test environment without cookies, getServerSession returns null -> renders login form
  const pageResult = await AdminLoginPage({
    searchParams: Promise.resolve({ callbackUrl: "/admin/certificates" }),
  });
  assert(
    Boolean(pageResult && typeof pageResult === "object"),
    "Unauthenticated user receives login form component without redirect"
  );
  assert(
    (pageResult as any).props?.callbackUrl === "/admin/certificates",
    "Page forwards sanitized callbackUrl to AdminLoginForm component"
  );

  // -------------------------------------------------------------
  // GROUP 2: Open Redirect Prevention & CallbackUrl Sanitization
  // -------------------------------------------------------------
  console.log("\n[Group 2] CallbackUrl Security & Sanitization");

  // 2.1: Valid internal admin callbackUrl is preserved
  assert(
    sanitizeCallbackUrl("/admin/certificates") === "/admin/certificates",
    "Preserves safe internal callbackUrl (/admin/certificates)"
  );
  assert(
    sanitizeCallbackUrl("/admin/settings") === "/admin/settings",
    "Preserves safe internal callbackUrl (/admin/settings)"
  );
  assert(
    sanitizeCallbackUrl("/admin/dashboard") === "/admin/dashboard",
    "Preserves safe internal callbackUrl (/admin/dashboard)"
  );

  // 2.2: Open redirect to external domain sanitized to /admin/dashboard
  assert(
    sanitizeCallbackUrl("https://evil-phishing-site.com") === "/admin/dashboard",
    "Sanitizes external open-redirect URL to /admin/dashboard"
  );

  // 2.3: Protocol-relative external URL (//evil.com) sanitized
  assert(
    sanitizeCallbackUrl("//evil.com/steal") === "/admin/dashboard",
    "Sanitizes protocol-relative URL to /admin/dashboard"
  );

  // 2.4: Non-admin internal URL (/contact, /about) sanitized to /admin/dashboard
  assert(
    sanitizeCallbackUrl("/contact") === "/admin/dashboard",
    "Sanitizes non-admin internal route (/contact) to /admin/dashboard"
  );
  assert(
    sanitizeCallbackUrl("/careers") === "/admin/dashboard",
    "Sanitizes non-admin internal route (/careers) to /admin/dashboard"
  );

  // 2.5: Missing / empty / whitespace callbackUrl defaults to /admin/dashboard
  assert(
    sanitizeCallbackUrl(undefined) === "/admin/dashboard",
    "Defaults undefined callbackUrl to /admin/dashboard"
  );
  assert(
    sanitizeCallbackUrl("") === "/admin/dashboard",
    "Defaults empty callbackUrl to /admin/dashboard"
  );

  // -------------------------------------------------------------
  // GROUP 3: Styled Components & UI Tokens Consistency
  // -------------------------------------------------------------
  console.log("\n[Group 3] Styled Components & Design System Tokens");
  const stylesModule = await import("../src/features/auth/AdminLogin.styles");

  assert(Boolean(stylesModule.LoginWrapper), "Exports LoginWrapper styled component");
  assert(Boolean(stylesModule.LoginCard), "Exports LoginCard styled component");
  assert(Boolean(stylesModule.OtpInput), "Exports OtpInput styled component");
  assert(Boolean(stylesModule.Button), "Exports Button styled component");
  assert(Boolean(stylesModule.AlertBox), "Exports AlertBox styled component");
  assert(Boolean(stylesModule.StepTracker), "Exports StepTracker styled component");
  assert(Boolean(stylesModule.ResendButton), "Exports ResendButton styled component");
  assert(Boolean(stylesModule.Spinner), "Exports Spinner component");

  // -------------------------------------------------------------
  // GROUP 4: AdminLoginForm Component Module Exports & Types
  // -------------------------------------------------------------
  console.log("\n[Group 4] AdminLoginForm Module Export Verification");
  const formModule = await import("../src/features/auth/AdminLoginForm");
  assert(
    typeof formModule.default === "function",
    "Exports AdminLoginForm as default functional React component"
  );

  console.log("\n=======================================================");
  console.log(`  PHASE 3 EDGE CASE TESTS SUMMARY: ${testsPassed}/${testsRun} PASSED (${testsFailed} FAILED)`);
  console.log("=======================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase3EdgeCaseTests().catch((err) => {
  console.error("FATAL ERROR in Phase 3 test suite:", err);
  process.exit(1);
});
