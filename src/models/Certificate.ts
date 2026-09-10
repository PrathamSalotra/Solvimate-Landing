import mongoose, { Schema, Document, Model } from "mongoose";

export const CERTIFICATE_STATUSES = ["active", "revoked"] as const;
export type CertificateStatus = typeof CERTIFICATE_STATUSES[number];

export interface ICertificate extends Document {
  verificationId: string;
  candidateName: string;
  candidatePhoto?: string;
  email: string;
  phone?: string;
  internshipRole: string;
  department: string;
  organization: string;
  issueDate: Date;
  startDate?: Date;
  endDate?: Date;
  duration?: string;
  description?: string;
  badges: string[];
  status: CertificateStatus;
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  cloudinaryPublicId?: string;
  verificationCount: number;
  lastVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
  {
    verificationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
    },
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidatePhoto: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    internshipRole: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    duration: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    badges: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: CERTIFICATE_STATUSES,
      default: "active",
      index: true,
    },
    certificatePdfUrl: {
      type: String,
      trim: true,
    },
    certificateImageUrl: {
      type: String,
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      trim: true,
    },
    verificationCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastVerifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


certificateSchema.index({ createdAt: -1 });

const Certificate: Model<ICertificate> =
  mongoose.models.Certificate ||
  mongoose.model<ICertificate>("Certificate", certificateSchema);

export default Certificate;
