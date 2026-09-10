import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  phone?: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "emailed" | "email_failed";
  emailSentAt?: Date;
  emailError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "emailed", "email_failed"],
      default: "new",
      index: true,
    },
    emailSentAt: { type: Date },
    emailError: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
