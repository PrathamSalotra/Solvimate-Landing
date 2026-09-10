import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminLoginChallenge extends Document {
  adminId: mongoose.Types.ObjectId;
  email: string;
  otpHash?: string;
  expiresAt: Date;
  attempts: number;
  consumedAt?: Date;
  purpose: "login" | "password_reset";
  linkTokenHash?: string;
  linkExpiresAt?: Date;
  linkVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminLoginChallengeSchema = new Schema<IAdminLoginChallenge>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    otpHash: {
      type: String,
      trim: true,
      select: false,
    },
    expiresAt: {
      type: Date,
      index: true,
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    consumedAt: {
      type: Date,
      index: true,
    },
    purpose: {
      type: String,
      enum: ["login", "password_reset"],
      default: "login",
      required: true,
    },
    linkTokenHash: {
      type: String,
      trim: true,
      select: false,
    },
    linkExpiresAt: {
      type: Date,
    },
    linkVerifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// TTL Index for auto-deletion of expired challenges (24 hours after creation)
adminLoginChallengeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });
adminLoginChallengeSchema.index({ email: 1, consumedAt: 1, expiresAt: 1 });

const AdminLoginChallenge: Model<IAdminLoginChallenge> =
  mongoose.models.AdminLoginChallenge ||
  mongoose.model<IAdminLoginChallenge>("AdminLoginChallenge", adminLoginChallengeSchema);

export default AdminLoginChallenge;
