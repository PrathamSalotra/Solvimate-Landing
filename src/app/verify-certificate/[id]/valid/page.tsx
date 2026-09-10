import Image from "next/image";
import { redirect } from "next/navigation";
import { getCertificateById } from "@/services/certificate.service";
import CertificateActions from "./CertificateActions";
import {
  Page,
  Container,
  VerificationHeader,
  VerificationBadge,
  PageTitle,
  VerificationId,
  CertificateCard,
  CardHeading,
  ValidIcon,
  ValidTitle,
  IdentityRow,
  Avatar,
  IdentityDetails,
  CandidateName,
  CandidateMeta,
  MetaSeparator,
  Description,
  DetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ActiveValue,
  BadgesSection,
  BadgesLabel,
  BadgeList,
  Badge,
  FooterNote,
} from "./valid.styles";

interface ValidCertificatePageProps {
  params: Promise<{ id: string }>;
}

function formatDate(value?: Date | string | null) {
  if (!value) return "Not provided";
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ValidCertificatePage({
  params,
}: ValidCertificatePageProps) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate || certificate.status !== "active") {
    redirect(`/verify-certificate/${encodeURIComponent(id.trim().toUpperCase())}/invalid`);
  }

  const verificationId = certificate.verificationId;
  const initials = certificate.candidateName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Page>
      <Container>
        <VerificationHeader>
          <VerificationBadge>CERTIFICATE VERIFIED</VerificationBadge>
          <PageTitle>Solvimate Certificate Verification</PageTitle>
          <VerificationId>Verification ID: <strong>{verificationId}</strong></VerificationId>
        </VerificationHeader>

        <CertificateCard>
          <CardHeading>
            <ValidIcon aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </ValidIcon>
            <ValidTitle>VERIFIED CERTIFICATE</ValidTitle>
          </CardHeading>

          <IdentityRow>
            <Avatar $hasPhoto={Boolean(certificate.candidatePhoto)}>
              {certificate.candidatePhoto ? (
                <Image src={certificate.candidatePhoto} alt="" width={40} height={40} />
              ) : initials}
            </Avatar>
            <IdentityDetails>
              <CandidateName>{certificate.candidateName}</CandidateName>
              <CandidateMeta>
                {certificate.internshipRole}
                <MetaSeparator>•</MetaSeparator>
                {certificate.department}
                <MetaSeparator>•</MetaSeparator>
                {certificate.organization}
              </CandidateMeta>
            </IdentityDetails>
          </IdentityRow>

          {certificate.description ? <Description>{certificate.description}</Description> : null}

          <DetailsGrid>
            <DetailItem><DetailLabel>Issue Date</DetailLabel><DetailValue>{formatDate(certificate.issueDate)}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>Start Date</DetailLabel><DetailValue>{formatDate(certificate.startDate)}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>End Date</DetailLabel><DetailValue>{formatDate(certificate.endDate)}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>Duration</DetailLabel><DetailValue>{certificate.duration || "Not provided"}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>Certificate ID</DetailLabel><DetailValue>{verificationId}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>Status</DetailLabel><ActiveValue>ACTIVE</ActiveValue></DetailItem>
            <DetailItem><DetailLabel>Verification Timestamp</DetailLabel><DetailValue>{formatDate(certificate.lastVerifiedAt)}</DetailValue></DetailItem>
            <DetailItem><DetailLabel>Verification Count</DetailLabel><DetailValue>{certificate.verificationCount}</DetailValue></DetailItem>
          </DetailsGrid>

          {certificate.badges.length > 0 ? (
            <BadgesSection>
              <BadgesLabel>Achievement Badges</BadgesLabel>
              <BadgeList>{certificate.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}</BadgeList>
            </BadgesSection>
          ) : null}

          <CertificateActions
            verificationId={verificationId}
            certificatePdfUrl={certificate.certificatePdfUrl}
            certificateImageUrl={certificate.certificateImageUrl}
          />
        </CertificateCard>

        <FooterNote>Secure Certificate Verification System</FooterNote>
      </Container>
    </Page>
  );
}
