import { NextResponse } from 'next/server';
import ContactSubmission from '@/models/ContactSubmission';
import dbConnect from '@/lib/mongodb';
import { FROM, resend } from '@/lib/resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

    const submission = {
      name: name.trim(),
      phone: phone ? phone.trim() : undefined,
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Project enquiry',
      message: message.trim(),
    };

    await dbConnect();
    const contactSubmission = await ContactSubmission.create(submission);
    const recipient = process.env.RESEND_CONTACT_EMAIL || FROM;
    const htmlSubmission = {
      name: escapeHtml(submission.name),
      email: escapeHtml(submission.email),
      phone: escapeHtml(submission.phone || 'Not provided'),
      subject: escapeHtml(submission.subject),
      message: escapeHtml(submission.message).replace(/\n/g, '<br>'),
    };

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [recipient],
      replyTo: submission.email,
      subject: `[Contact form] ${submission.subject}`,
      text: `New contact form submission\n\nName: ${submission.name}\nEmail: ${submission.email}\nPhone: ${submission.phone || 'Not provided'}\nSubject: ${submission.subject}\n\nMessage:\n${submission.message}`,
      html: `<h2>New contact form submission</h2><p><strong>Name:</strong> ${htmlSubmission.name}</p><p><strong>Email:</strong> ${htmlSubmission.email}</p><p><strong>Phone:</strong> ${htmlSubmission.phone}</p><p><strong>Subject:</strong> ${htmlSubmission.subject}</p><p><strong>Message:</strong><br>${htmlSubmission.message}</p>`,
    });

    if (error) {
      await ContactSubmission.findByIdAndUpdate(contactSubmission._id, {
        $set: { status: 'email_failed', emailError: error.message },
      });
      console.error('[API /contact] Resend delivery error:', error);
      return NextResponse.json(
        { error: 'Your message was saved, but email delivery failed. Please try again.' },
        { status: 502 }
      );
    }

    await ContactSubmission.findByIdAndUpdate(contactSubmission._id, {
      $set: { status: 'emailed', emailSentAt: new Date() },
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /contact] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
