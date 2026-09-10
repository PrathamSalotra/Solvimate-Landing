import mongoose, { Schema, Document, Model } from "mongoose";

export const ADMIN_ROLES = ["super_admin", "admin", "manager"] as const;
export type AdminRole = typeof ADMIN_ROLES[number];

export interface IAdmin extends Document {
  email: string;
  name?: string;
  passwordHash?: string;
  role: AdminRole;
  isActive: boolean;
  lastOtpSentAt?: Date;
  lastLoginAt?: Date;
  passwordUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: ADMIN_ROLES,
      default: "manager",
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastOtpSentAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
    passwordUpdatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


adminSchema.index({ role: 1, isActive: 1 });

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
