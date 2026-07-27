-- ==========================================
-- Solvimate Database Schema Migration
-- Migration: 0001_init.sql
-- ==========================================

-- 1. PROFILES TABLE (Linked to auth.users)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to check if the executing user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Trigger to create profile record when new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. CONTACT SUBMISSIONS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL DEFAULT 'contact' CHECK (source IN ('contact', 'customer_form')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT DEFAULT 'Project enquiry',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 3. JOB LISTINGS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  track TEXT NOT NULL DEFAULT 'candidate' CHECK (track IN ('candidate', 'vendor')),
  category TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'closed')),
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 4. INTERNSHIPS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 5. NEWS ARTICLES TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------
CREATE POLICY "Users can view own profile or admin can view all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can update own profile or admin can update all"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

-- ------------------------------------------
-- CONTACT SUBMISSIONS POLICIES
-- No anon SELECT/INSERT policy exists.
-- Public users (anon) cannot select or insert directly via client SDK.
-- Server-side API route uses service_role key to insert/query.
-- Admins can view and manage submissions.
-- ------------------------------------------
CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------
-- JOB LISTINGS POLICIES
-- Public select for 'available' listings; Admins have full access.
-- ------------------------------------------
CREATE POLICY "Public can view available job listings"
  ON public.job_listings
  FOR SELECT
  USING (status = 'available' OR public.is_admin());

CREATE POLICY "Admins can insert job listings"
  ON public.job_listings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update job listings"
  ON public.job_listings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete job listings"
  ON public.job_listings
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------
-- INTERNSHIPS POLICIES
-- Public select for 'open' internships; Admins have full access.
-- ------------------------------------------
CREATE POLICY "Public can view open internships"
  ON public.internships
  FOR SELECT
  USING (status = 'open' OR public.is_admin());

CREATE POLICY "Admins can insert internships"
  ON public.internships
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update internships"
  ON public.internships
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete internships"
  ON public.internships
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------
-- NEWS ARTICLES POLICIES
-- Public select for published news articles; Admins have full access.
-- ------------------------------------------
CREATE POLICY "Public can view published news articles"
  ON public.news_articles
  FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can insert news articles"
  ON public.news_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update news articles"
  ON public.news_articles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete news articles"
  ON public.news_articles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ==========================================
-- VERIFICATION HELPER QUERIES (FOR SQL EDITOR)
-- ==========================================
-- Run in Supabase SQL Editor to test:
--
-- 1) Test anon permissions on contact_submissions (should fail / return 0 rows):
--    SET ROLE anon;
--    SELECT * FROM public.contact_submissions;
--    INSERT INTO public.contact_submissions (full_name, email, message) VALUES ('Test', 'test@example.com', 'Hello');
--    RESET ROLE;
--
-- 2) Test anon SELECT on job_listings, internships, news_articles (should work):
--    SET ROLE anon;
--    SELECT * FROM public.job_listings;
--    SELECT * FROM public.internships;
--    SELECT * FROM public.news_articles;
--    RESET ROLE;
