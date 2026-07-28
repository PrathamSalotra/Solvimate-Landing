-- ==========================================
-- SEED DATA FOR PUBLIC.INTERNSHIPS (§2.6)
-- ==========================================
-- Run in Supabase SQL Editor to test open internship listings.
-- To test the spec-compliant empty state ("No open internships at the moment. Check back soon!"),
-- either do not run this insert or set status = 'closed'.

INSERT INTO public.internships (title, description, status)
VALUES
  (
    'AI Speech Dataset Annotation Intern',
    'Work alongside senior linguists and ML engineers to evaluate and annotate multilingual speech transcription datasets.',
    'open'
  ),
  (
    'Linguistic Quality Assurance (QA) Intern - Dutch / English',
    'Assist in quality checking Dutch (Netherlands) and English audio transcriptions for accuracy, timing, and formatting.',
    'open'
  );
