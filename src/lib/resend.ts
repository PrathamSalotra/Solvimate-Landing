import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not defined. Email dispatch will fail.");
}

export const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");
export const FROM = process.env.RESEND_FROM_EMAIL || "Solvimate <operations@solvimate.com>";
