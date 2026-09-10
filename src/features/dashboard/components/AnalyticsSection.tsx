import { DashboardTopCertificate } from "@/services/dashboard.service";
import {
  SectionCard,
  SectionTitle,
  SectionSubtext,
  EmptyState,
  BarList,
  BarRow,
  BarLabelRow,
  BarTrack,
  BarFill,
} from "./AnalyticsSection.styles";

function getBarWidth(current: number, max: number) {
  if (max <= 0) {
    return "0%";
  }
  return `${Math.max(8, Math.round((current / max) * 100))}%`;
}

interface AnalyticsSectionProps {
  topVerifiedCertificates: DashboardTopCertificate[];
}

export default function AnalyticsSection({
  topVerifiedCertificates,
}: AnalyticsSectionProps) {
  const maxCount = topVerifiedCertificates.reduce(
    (max, item) => Math.max(max, item.verificationCount),
    0
  );

  return (
    <SectionCard>
      <SectionTitle>Verification Analytics</SectionTitle>
      <SectionSubtext>
        Top certificates by successful verification volume.
      </SectionSubtext>

      {topVerifiedCertificates.length === 0 ? (
        <EmptyState>No certificate analytics available yet.</EmptyState>
      ) : (
        <BarList>
          {topVerifiedCertificates.map((item) => (
            <BarRow key={item.verificationId}>
              <BarLabelRow>
                <p>{item.candidateName}</p>
                <p>{item.verificationCount} checks</p>
              </BarLabelRow>
              <SectionSubtext>ID: {item.verificationId}</SectionSubtext>
              <BarTrack>
                <BarFill width={getBarWidth(item.verificationCount, maxCount)} />
              </BarTrack>
            </BarRow>
          ))}
        </BarList>
      )}
    </SectionCard>
  );
}
