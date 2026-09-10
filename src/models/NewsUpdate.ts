import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsUpdate extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsUpdateSchema = new Schema<INewsUpdate>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NewsUpdate: Model<INewsUpdate> =
  mongoose.models.NewsUpdate || mongoose.model<INewsUpdate>("NewsUpdate", NewsUpdateSchema);

export default NewsUpdate;
