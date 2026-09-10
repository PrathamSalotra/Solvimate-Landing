import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_CERTIFICATE_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/png"]);

export class UploadValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "UploadValidationError";
    this.statusCode = statusCode;
  }
}

function getResourceTypeForMimeType(mimeType: string): "raw" | "image" {
  return mimeType === "application/pdf" ? "raw" : "image";
}

function normalizeVerificationId(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (!normalized) {
    throw new UploadValidationError("Certificate ID is required before upload.");
  }
  return normalized;
}

function validateFile(file: File) {
  if (file.size <= 0) {
    throw new UploadValidationError("Uploaded file is empty.");
  }

  if (file.size > MAX_CERTIFICATE_FILE_SIZE_BYTES) {
    throw new UploadValidationError("File exceeds the 15MB upload limit.");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new UploadValidationError("Only PDF and PNG files are supported.");
  }
}

export interface UploadAssetResult {
  verificationId: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  format: string;
  originalFilename: string;
  bytes: number;
}

export async function uploadCertificateAsset(
  file: File,
  verificationIdRaw: string
): Promise<UploadAssetResult> {
  validateFile(file);

  const verificationId = normalizeVerificationId(verificationIdRaw);
  const originalFilename = file.name.trim() || "certificate";

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const resourceType = getResourceTypeForMimeType(file.type);

  const options = {
    folder: "solvimate/certificates",
    public_id: verificationId,
    resource_type: resourceType,
    overwrite: true,
  };

  const uploadResult = await uploadToCloudinary(fileBuffer, options);

  if (uploadResult.resource_type !== resourceType) {
    throw new Error("Uploaded certificate resource type does not match expected type.");
  }

  return {
    verificationId,
    secureUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    resourceType: uploadResult.resource_type,
    format: uploadResult.format,
    originalFilename,
    bytes: uploadResult.bytes,
  };
}
