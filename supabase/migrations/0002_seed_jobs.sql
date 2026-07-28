-- ==========================================
-- SEED DATA FOR PUBLIC.JOB_LISTINGS (§2.5)
-- ==========================================
-- Run in Supabase SQL Editor to populate initial available job opportunities

INSERT INTO public.job_listings (title, track, category, languages, status, description)
VALUES
  (
    'Dutch (Netherlands) Audio Transcription Specialist',
    'candidate',
    'Transcription',
    ARRAY['Dutch (Netherlands)', 'English'],
    'available',
    'We are seeking native or fluent Dutch (Netherlands) specialists for high-accuracy audio and video transcription of multi-speaker conversations and interviews.'
  ),
  (
    'Malaysian Speech Recording Collaborator',
    'candidate',
    'Recording',
    ARRAY['Malaysian', 'English'],
    'available',
    'Looking for voice contributors across Malaysia to record structured speech datasets for training speech recognition and acoustic AI models.'
  ),
  (
    'Multilingual AI Data Annotation Agency Partner',
    'vendor',
    'Data Annotation',
    ARRAY['English', 'Dutch (Netherlands)', 'Malaysian'],
    'available',
    'Agency-level partnership for high-volume text annotation, sentiment tagging, and RLHF evaluation across European and Southeast Asian languages.'
  ),
  (
    'K-12 STEM Content Development Consultant',
    'candidate',
    'Content Creation',
    ARRAY['English'],
    'available',
    'Curriculum design specialist needed for developing K-12 STEM educational materials, interactive assessment items, and teacher support guides.'
  ),
  (
    'Robotic Video Data Collection Team Partner',
    'vendor',
    'Robotic Video Data Collection',
    ARRAY['English', 'Dutch (Netherlands)'],
    'available',
    'Specialized vendor partnership for collecting and annotating robotic manipulation video datasets in controlled laboratory environments.'
  );
