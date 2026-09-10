import { NextResponse } from "next/server";
import { requestAdminLoginOtp, AdminAuthError } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await requestAdminLoginOtp(body);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("requestAdminLoginOtp error:", error);
    
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
