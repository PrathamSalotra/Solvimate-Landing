import { redirect } from "next/navigation";
import { getCertificateById } from "@/services/certificate.service";
import {
  Page,
  Container,
  VerificationHeader,
  VerificationBadge,
  PageTitle,
  VerificationId,
  InvalidCard,
  InvalidHeading,
  InvalidIcon,
  InvalidTitle,
  InvalidMessage,
  CardDivider,
  SupportRow,
  SupportText,
  SupportLink,
  ErrorCode,
  Actions,
  HomeLink,
  VerifyAgainLink,
  FooterNote,
} from "./invalid.styles";

interface InvalidCertificatePageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function InvalidCertificatePage({
  params,
}: InvalidCertificatePageProps) {
  const { id } = await params;
  const verificationId = id.trim().toUpperCase();
  const certificate = await getCertificateById(verificationId);

  if (certificate?.status === "active") {
    redirect(`/verify-certificate/${encodeURIComponent(verificationId)}/valid`);
  }

  return (
    <Page>
      <Container>
        <VerificationHeader>
          <VerificationBadge>VERIFICATION FAILED</VerificationBadge>
          <PageTitle>Solvimate Certificate Verification</PageTitle>
          <VerificationId>Verification ID: <strong>{verificationId}</strong></VerificationId>
        </VerificationHeader>

        <InvalidCard>
          <InvalidHeading>
            <InvalidIcon aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="m7 7 10 10M17 7 7 17" /></svg>
            </InvalidIcon>
            <InvalidTitle>Invalid Certificate</InvalidTitle>
          </InvalidHeading>

          <InvalidMessage>This certificate either does not exist, has been revoked, or contains invalid credentials.</InvalidMessage>
          <CardDivider />

          <SupportRow>
            <SupportText>Need assistance verifying your certificate? <SupportLink href="/customer-support">Contact Solvimate Verification Support</SupportLink></SupportText>
            <ErrorCode>Error Code: 404_CERT_NOT_FOUND</ErrorCode>
          </SupportRow>

          <Actions>
            <HomeLink href="/">Back To Home</HomeLink>
            <VerifyAgainLink href="/verify-certificate">Verify Another ID</VerifyAgainLink>
          </Actions>
        </InvalidCard>

        <FooterNote>Secure Certificate Verification System</FooterNote>
      </Container>
    </Page>
  );
}
