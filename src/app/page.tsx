import { listJobs } from '@/services/cms.service';
import HomeClient from './HomeClient';

export const revalidate = 86400; // Longer ISR window per spec rendering-strategy decision (24 hours)

export default async function Home() {
  let listingsCount = 0;

  try {
    const jobs = await listJobs();
    listingsCount = jobs.filter((job) => job.isActive).length;
  } catch (err) {
    console.error('Server Component query to job listings error:', err);
  }

  return <HomeClient listingsCount={listingsCount} />;
}
