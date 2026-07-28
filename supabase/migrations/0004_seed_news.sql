-- ==========================================
-- SEED DATA FOR PUBLIC.NEWS_ARTICLES (§2.7)
-- ==========================================
-- Run in Supabase SQL Editor to test published news articles.
-- To test the spec-compliant empty state ("No news articles yet."),
-- either do not run this insert or set is_published = false.

INSERT INTO public.news_articles (title, slug, body, is_published, published_at)
VALUES
  (
    'Solvimate Expands Multilingual AI Voice Annotation Across 15 European and Asian Languages',
    'solvimate-expands-multilingual-ai-voice-annotation-15-languages',
    'We are thrilled to announce a major expansion of our global voice recording, speech transcription, and RLHF data annotation capabilities. By collaborating with regional language specialists and agency partners across Europe and Southeast Asia—including native Dutch (Netherlands) and Malaysian contributors—Solvimate is powering next-generation acoustic and speech AI models with unmatched accuracy and cultural nuance.',
    true,
    NOW()
  ),
  (
    'Unlocking Global Engagement: Why Human-in-the-Loop Localization Outperforms Pure Machine Translation',
    'why-human-in-the-loop-localization-outperforms-pure-machine-translation',
    'While large language models have transformed basic translation, enterprise educational and corporate campaigns require subtle cultural tone, precise terminology, and expressive voice dubbing. Discover how Solvimate combines AI efficiency with expert human review to deliver seamless global content.',
    true,
    NOW() - INTERVAL '3 days'
  );
