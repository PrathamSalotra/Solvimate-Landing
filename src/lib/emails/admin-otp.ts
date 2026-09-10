const FONT_STACK = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

interface AdminOtpEmailProps {
  email: string;
  otp: string;
  expiresInMinutes: number;
}

export function renderAdminOtpEmail({ email, otp, expiresInMinutes }: AdminOtpEmailProps) {
  const safeEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeOtp = otp.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Login Verification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: ${FONT_STACK};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="padding: 40px 48px;">
                  <h1 style="margin: 0 0 24px; font-size: 24px; color: #111827;">Solvimate Admin Access</h1>
                  <p style="margin: 0 0 8px; font-size: 15px; color: #4b5563;">Hello ${safeEmail},</p>
                  <p style="margin: 0 0 24px; font-size: 15px; color: #4b5563;">Please use the verification code below to complete your sign-in.</p>
                  
                  <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 24px; text-align: center; margin-bottom: 24px;">
                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #047857; font-family: 'Courier New', Courier, monospace;">
                      ${safeOtp}
                    </span>
                  </div>
                  
                  <p style="margin: 0 0 24px; font-size: 14px; color: #6b7280;">
                    This code will expire in ${expiresInMinutes} minutes. If you did not request this, please safely ignore this email.
                  </p>
                  
                  <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0 24px;" />
                  
                  <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                    &copy; ${new Date().getFullYear()} Solvimate. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `Solvimate — Admin Login Verification

Hello ${email},

Use this code to complete your admin sign-in: ${otp}

This code expires in ${expiresInMinutes} minutes. If you did not request it, you can safely ignore this email.

© ${new Date().getFullYear()} Solvimate. All rights reserved.`;

  return { html, text };
}
