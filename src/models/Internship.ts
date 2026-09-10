import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInternship extends Document {
  title: string;
  department?: string;
  location?: string;
  mode: "remote" | "onsite" | "hybrid";
  description: string;
  requirements: string[];
  duration?: string;
  stipend?: string;
  isActive: boolean;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InternshipSchema = new Schema<IInternship>(
  {
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    mode: { type: String, enum: ["remote", "onsite", "hybrid"], default: "remote" },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    duration: { type: String },
    stipend: { type: String },
    isActive: { type: Boolean, default: true, index: true },
    deadline: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Internship: Model<IInternship> =
  mongoose.models.Internship || mongoose.model<IInternship>("Internship", InternshipSchema);

export default Internship;
