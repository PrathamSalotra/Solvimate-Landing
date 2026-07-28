import { supabaseServer } from '@/lib/supabase/server';
import HomeClient from './HomeClient';

export const revalidate = 0; // Dynamic server rendering

export default async function Home() {
  let listingsCount = 0;

  try {
    const { data, error } = await supabaseServer.from('job_listings').select('id, title, status');

    if (!error && data) {
      listingsCount = data.length;
    }
  } catch (err) {
    console.error('Server Component query to job_listings error:', err);
  }

  return <HomeClient listingsCount={listingsCount} />;
}
