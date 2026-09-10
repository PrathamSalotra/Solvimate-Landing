"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadAssetResult } from "@/services/upload.service";
import { RecentCertificateItem } from "./RecentCertificatesPanel";
import {
  SectionCard,
  SectionTitle,
  SectionDescription,
  PreviewBlock,
  FormGrid,
  Field,
  BadgeGroup,
  BadgeOptions,
  BadgeOption,
  FormActions,
  PrimaryButton,
  ErrorText,
  SuccessText,
} from "./CertificateDetailsForm.styles";

const DEFAULT_BADGES = [
  "Best Performer",
  "Team Leader",
  "Fast Learner",
  "Innovation Star",
];

function normalizeVerificationId(value: string) {
  return value.trim().toUpperCase();
}

function splitCustomBadges(customBadges: string) {
  return customBadges
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildBadgeList(values: { badges?: string[]; customBadges?: string }) {
  const selectedBadges = values.badges ?? [];
  const customBadges = splitCustomBadges(values.customBadges ?? "");
  return Array.from(new Set([...selectedBadges, ...customBadges]));
}

function normalizeOptionalDate(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

interface CertificateDetailsFormProps {
  uploadedAsset: UploadAssetResult | null;
  onCertificateCreated: (cert: RecentCertificateItem) => void;
}

export default function CertificateDetailsForm({
  uploadedAsset,
  onCertificateCreated,
}: CertificateDetailsFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      verificationId: "",
      candidateName: "",
      email: "",
      phone: "",
      internshipRole: "",
      department: "",
      organization: "Solvimate",
      issueDate: "",
      startDate: "",
      endDate: "",
      duration: "",
      description: "",
      customBadges: "",
      badges: [],
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    if (!uploadedAsset) {
      setSubmitError("Upload the certificate file before saving metadata.");
      return;
    }

    try {
      const normalizedVerificationId = normalizeVerificationId(values.verificationId);

      if (uploadedAsset.verificationId !== normalizedVerificationId) {
        setSubmitError(
          `Uploaded file belongs to ${uploadedAsset.verificationId}. Use the same Certificate ID while saving metadata.`
        );
        return;
      }

      const payload = {
        verificationId: normalizedVerificationId,
        candidateName: values.candidateName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim() || undefined,
        internshipRole: values.internshipRole.trim(),
        department: values.department.trim(),
        organization: values.organization.trim(),
        issueDate: values.issueDate,
        startDate: normalizeOptionalDate(values.startDate),
        endDate: normalizeOptionalDate(values.endDate),
        duration: values.duration.trim() || undefined,
        description: values.description.trim() || undefined,
        badges: buildBadgeList(values),
        status: "active",
        certificatePdfUrl:
          uploadedAsset.resourceType === "raw" ? uploadedAsset.secureUrl : undefined,
        certificateImageUrl:
          uploadedAsset.resourceType === "image" ? uploadedAsset.secureUrl : undefined,
        cloudinaryPublicId: uploadedAsset.publicId,
      };

      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.ok || !responseData.data) {
        throw new Error(responseData.message || "Failed to save certificate metadata.");
      }

      onCertificateCreated({
        verificationId: responseData.data.certificate.verificationId,
        candidateName: responseData.data.certificate.candidateName,
        status: responseData.data.certificate.status,
        internshipRole: responseData.data.certificate.internshipRole,
        createdAt: responseData.data.certificate.createdAt,
      });

      const verificationBaseUrl = window.location.origin;
      setSuccessMessage(
        `Certificate saved successfully. Public verification URL: ${verificationBaseUrl}/verify/${responseData.data.certificate.verificationId}`
      );

      reset({
        verificationId: "",
        candidateName: "",
        email: "",
        phone: "",
        internshipRole: "",
        department: "",
        organization: "Solvimate",
        issueDate: "",
        startDate: "",
        endDate: "",
        duration: "",
        description: "",
        customBadges: "",
        badges: [],
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save certificate metadata.";
      setSubmitError(message);
    }
  });

  return (
    <SectionCard>
      <SectionTitle>2. Save Certificate Metadata</SectionTitle>
      <SectionDescription>
        This step saves certificate metadata only. Existing certificate file and QR remain
        unchanged.
      </SectionDescription>

      <PreviewBlock>
        <p>Verification URL (permanent):</p>
        <code>/verify/{"{CERTIFICATE_ID}"}</code>
      </PreviewBlock>

      <FormGrid onSubmit={onSubmit} noValidate>
        <Field>
          <span>Certificate ID *</span>
          <input
            placeholder="SVM26-A8X9Q2"
            {...register("verificationId", { required: "Certificate ID is required." })}
          />
          {errors.verificationId && <small>{errors.verificationId.message}</small>}
        </Field>

        <Field>
          <span>Candidate Name *</span>
          <input
            placeholder="Aarav Sharma"
            {...register("candidateName", { required: "Candidate name is required." })}
          />
          {errors.candidateName && <small>{errors.candidateName.message}</small>}
        </Field>

        <Field>
          <span>Email *</span>
          <input
            type="email"
            placeholder="candidate@example.com"
            {...register("email", { required: "Email is required." })}
          />
          {errors.email && <small>{errors.email.message}</small>}
        </Field>

        <Field>
          <span>Phone</span>
          <input placeholder="+91XXXXXXXXXX" {...register("phone")} />
        </Field>

        <Field>
          <span>Internship Role *</span>
          <input
            placeholder="AI Intern"
            {...register("internshipRole", { required: "Internship role is required." })}
          />
          {errors.internshipRole && <small>{errors.internshipRole.message}</small>}
        </Field>

        <Field>
          <span>Department *</span>
          <input
            placeholder="Engineering"
            {...register("department", { required: "Department is required." })}
          />
          {errors.department && <small>{errors.department.message}</small>}
        </Field>

        <Field>
          <span>Organization *</span>
          <input {...register("organization", { required: "Organization is required." })} />
        </Field>

        <Field>
          <span>Issue Date *</span>
          <input
            type="date"
            {...register("issueDate", { required: "Issue date is required." })}
          />
          {errors.issueDate && <small>{errors.issueDate.message}</small>}
        </Field>

        <Field>
          <span>Start Date</span>
          <input type="date" {...register("startDate")} />
        </Field>

        <Field>
          <span>End Date</span>
          <input type="date" {...register("endDate")} />
        </Field>

        <Field>
          <span>Duration</span>
          <input placeholder="3 months" {...register("duration")} />
        </Field>

        <Field $fullWidth>
          <span>Description</span>
          <textarea
            rows={3}
            placeholder="Completed internship milestones..."
            {...register("description")}
          />
        </Field>

        <BadgeGroup>
          <legend>Badges</legend>
          <BadgeOptions>
            {DEFAULT_BADGES.map((badge) => (
              <BadgeOption key={badge}>
                <input type="checkbox" value={badge} {...register("badges")} />
                <span>{badge}</span>
              </BadgeOption>
            ))}
          </BadgeOptions>
          <input
            placeholder="Custom badges (comma-separated)"
            style={{ width: "100%" }}
            {...register("customBadges")}
          />
        </BadgeGroup>

        <FormActions>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Certificate Metadata"}
          </PrimaryButton>
        </FormActions>

        {submitError && <ErrorText>{submitError}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
      </FormGrid>
    </SectionCard>
  );
}
