import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobListing extends Document {
  title: string;
  department?: string;
  location?: string;
  mode: "remote" | "onsite" | "hybrid";
  description: string;
  requirements: string[];
  isActive: boolean;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobListingSchema = new Schema<IJobListing>(
  {
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    mode: { type: String, enum: ["remote", "onsite", "hybrid"], default: "remote" },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    isActive: { type: Boolean, default: true, index: true },
    deadline: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const JobListing: Model<IJobListing> =
  mongoose.models.JobListing || mongoose.model<IJobListing>("JobListing", JobListingSchema);

export default JobListing;
