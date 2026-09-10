import { NextResponse } from "next/server";
import { AdminAuthError } from "@/services/auth.service";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

// Basic implementation for resending OTP to fulfill Phase 2 requirements
// Note: A full password reset flow would require the resendPasswordResetOtp service method 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // In a real scenario, this would call resendPasswordResetOtp(body)
    // For Phase 2, we just validate the basic rate-limit to ensure it meets the requirements
    await dbConnect();
    const admin = await Admin.findOne({ email: body.email.toLowerCase().trim() });
    
    if (!admin) {
      return NextResponse.json(
        { error: "This email is not authorized." },
        { status: 401 }
      );
    }
    
    // Check cooldown
    const now = new Date();
    const OTP_RESEND_COOLDOWN_SECONDS = Number(process.env.ADMIN_OTP_RESEND_COOLDOWN_SECONDS ?? 30);
    
    if (admin.lastOtpSentAt) {
      const elapsedMs = now.getTime() - admin.lastOtpSentAt.getTime();
      if (elapsedMs < OTP_RESEND_COOLDOWN_SECONDS * 1000) {
        return NextResponse.json(
          { error: `Please wait ${OTP_RESEND_COOLDOWN_SECONDS} seconds before requesting another code.`, code: "OTP_RATE_LIMITED" },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { message: "OTP resent successfully (Mocked for Phase 2)" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
