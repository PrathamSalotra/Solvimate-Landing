"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadAssetResult } from "@/services/upload.service";
import { RecentCertificateItem } from "./RecentCertificatesPanel";
import {
  SectionCard,
  SectionHeader,
  TitleGroup,
  StepBadge,
  SectionTitle,
  FormGrid,
  FormInner,
  Field,
  BadgeGroup,
  BadgeOptions,
  BadgeOption,
  FormActions,
  ProtocolLabel,
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
      <SectionHeader>
        <TitleGroup>
          <StepBadge>2</StepBadge>
          <SectionTitle>Candidate & Credential Metadata</SectionTitle>
        </TitleGroup>
      </SectionHeader>

      <FormGrid onSubmit={onSubmit} noValidate>
        <FormInner>
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
          <span>Performance Summary & Milestones</span>
          <textarea
            rows={3}
            placeholder="Completed internship milestones in agentic workflows, deep learning pipelines..."
            {...register("description")}
          />
        </Field>

        <BadgeGroup>
          <legend>Merit Badges</legend>
          <BadgeOptions>
            {DEFAULT_BADGES.map((badge) => (
              <BadgeOption key={badge}>
                <input type="checkbox" value={badge} {...register("badges")} />
                <span>{badge}</span>
              </BadgeOption>
            ))}
          </BadgeOptions>
          <Field $fullWidth>
            <span>Custom Tags</span>
            <input
              placeholder="e.g. Hackathon Finalist, LLM Lead"
              style={{ width: "100%" }}
              {...register("customBadges")}
            />
          </Field>
        </BadgeGroup>

        {submitError && <ErrorText style={{ gridColumn: '1 / -1' }}>{submitError}</ErrorText>}
        {successMessage && <SuccessText style={{ gridColumn: '1 / -1' }}>{successMessage}</SuccessText>}
        </FormInner>

        <FormActions>
          <ProtocolLabel>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            SIGNED PROTOCOL 0x88F
          </ProtocolLabel>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            {isSubmitting ? "Saving..." : "Save Certificate Metadata"}
          </PrimaryButton>
        </FormActions>
      </FormGrid>
    </SectionCard>
  );
}
