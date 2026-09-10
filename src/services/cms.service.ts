import dbConnect from "@/lib/mongodb";
import JobListing from "@/models/JobListing";
import Internship from "@/models/Internship";
import NewsUpdate from "@/models/NewsUpdate";

function toIso(value?: Date | null): string | undefined {
  if (!value) return undefined;
  return value.toISOString();
}

// Jobs
export async function listJobs() {
  await dbConnect();
  const jobs = await JobListing.find({}).sort({ createdAt: -1 }).lean();
  return jobs.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    department: doc.department,
    location: doc.location,
    mode: doc.mode,
    description: doc.description,
    requirements: doc.requirements,
    isActive: doc.isActive,
    deadline: toIso(doc.deadline),
    createdAt: toIso(doc.createdAt),
    updatedAt: toIso(doc.updatedAt),
  }));
}

export async function createJob(data: any) {
  await dbConnect();
  const job = await JobListing.create(data);
  return job;
}

export async function updateJob(id: string, updates: any) {
  await dbConnect();
  const job = await JobListing.findByIdAndUpdate(id, { $set: updates }, { new: true });
  return job;
}

export async function deleteJob(id: string) {
  await dbConnect();
  await JobListing.findByIdAndDelete(id);
}

// Internships
export async function listInternships() {
  await dbConnect();
  const internships = await Internship.find({}).sort({ createdAt: -1 }).lean();
  return internships.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    department: doc.department,
    location: doc.location,
    mode: doc.mode,
    description: doc.description,
    requirements: doc.requirements,
    duration: doc.duration,
    stipend: doc.stipend,
    isActive: doc.isActive,
    deadline: toIso(doc.deadline),
    createdAt: toIso(doc.createdAt),
    updatedAt: toIso(doc.updatedAt),
  }));
}

export async function createInternship(data: any) {
  await dbConnect();
  const internship = await Internship.create(data);
  return internship;
}

export async function updateInternship(id: string, updates: any) {
  await dbConnect();
  const internship = await Internship.findByIdAndUpdate(id, { $set: updates }, { new: true });
  return internship;
}

export async function deleteInternship(id: string) {
  await dbConnect();
  await Internship.findByIdAndDelete(id);
}

// News Updates
export async function listNews() {
  await dbConnect();
  const news = await NewsUpdate.find({}).sort({ createdAt: -1 }).lean();
  return news.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage,
    author: doc.author,
    tags: doc.tags,
    isPublished: doc.isPublished,
    publishedAt: toIso(doc.publishedAt),
    createdAt: toIso(doc.createdAt),
    updatedAt: toIso(doc.updatedAt),
  }));
}

export async function createNews(data: any) {
  await dbConnect();
  const news = await NewsUpdate.create(data);
  return news;
}

export async function updateNews(id: string, updates: any) {
  await dbConnect();
  const news = await NewsUpdate.findByIdAndUpdate(id, { $set: updates }, { new: true });
  return news;
}

export async function deleteNews(id: string) {
  await dbConnect();
  await NewsUpdate.findByIdAndDelete(id);
}
