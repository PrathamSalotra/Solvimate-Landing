import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, _honeypot } = body;

    // 1. Check honeypot field
    if (_honeypot && typeof _honeypot === 'string' && _honeypot.trim().length > 0) {
      // Silently succeed without saving to fool spam bots
      return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
    }

    // 2. Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message cannot exceed 2000 characters' }, { status: 400 });
    }

    // 3. Optional test failure trigger for verifying error toast and data retention
    if (subject === 'FAIL_TEST' || email === 'fail@test.com') {
      return NextResponse.json({ error: 'Simulated failure for testing' }, { status: 500 });
    }

    // 4. If Supabase is configured, insert submission using service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone ? phone.trim() : null,
            email: email.trim(),
            subject: subject ? subject.trim() : 'Project enquiry',
            message: message.trim(),
            status: 'new',
            created_at: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('[API /contact] Supabase insert error:', errText);
          // Fall through to success if table not yet created in demo mode
        }
      } catch (err) {
        console.error('[API /contact] Error inserting to Supabase:', err);
      }
    } else {
      console.log('[API /contact] Submission received (no Supabase env configured):', {
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        email: email.trim(),
        subject: subject ? subject.trim() : 'Project enquiry',
        messageLength: message.trim().length,
      });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('[API /contact] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
