import dbConnect from "@/lib/mongodb";
import Admin, { AdminRole } from "@/models/Admin";

export interface AdminPayload {
  id: string;
  email: string;
  name?: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

function toIso(value?: Date | null): string | undefined {
  if (!value) return undefined;
  return value.toISOString();
}

function asAdminPayload(doc: any): AdminPayload {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    isActive: doc.isActive,
    lastLoginAt: toIso(doc.lastLoginAt),
    createdAt: toIso(doc.createdAt) as string,
  };
}

export async function listAdmins(): Promise<AdminPayload[]> {
  await dbConnect();
  const admins = await Admin.find({}).sort({ createdAt: -1 }).lean();
  return admins.map(asAdminPayload);
}

export async function inviteAdmin(email: string, role: AdminRole): Promise<AdminPayload> {
  await dbConnect();
  const normalizedEmail = email.trim().toLowerCase();
  
  const existing = await Admin.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error("An administrator with this email already exists.");
  }

  const newAdmin = await Admin.create({
    email: normalizedEmail,
    role,
    isActive: true,
  });

  return asAdminPayload(newAdmin);
}

export async function updateAdmin(
  id: string,
  updates: { role?: AdminRole; isActive?: boolean }
): Promise<AdminPayload> {
  await dbConnect();

  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error("Admin not found.");
  }

  if (updates.role !== undefined) admin.role = updates.role;
  if (updates.isActive !== undefined) admin.isActive = updates.isActive;

  await admin.save();
  return asAdminPayload(admin);
}
