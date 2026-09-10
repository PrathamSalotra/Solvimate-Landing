import {
  SectionCard,
  SectionTitle,
  SectionSubtext,
  StatusGrid,
  StatusRow,
  StatusLabelRow,
  StatusTrack,
  StatusFillActive,
  StatusFillRevoked,
  StatusFillNeutral,
} from "./CertificateHealth.styles";

function percent(part: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

interface CertificateHealthProps {
  statusBreakdown: {
    active: number;
    revoked: number;
  };
  verificationEngagement: {
    verifiedAtLeastOnce: number;
    neverVerified: number;
  };
}

export default function CertificateHealth({
  statusBreakdown,
  verificationEngagement,
}: CertificateHealthProps) {
  const totalStatus = statusBreakdown.active + statusBreakdown.revoked;
  const totalEngagement =
    verificationEngagement.verifiedAtLeastOnce + verificationEngagement.neverVerified;

  return (
    <SectionCard>
      <SectionTitle>Certificate Health</SectionTitle>
      <SectionSubtext>
        Status split and verification engagement across all certificates.
      </SectionSubtext>

      <StatusGrid>
        <StatusRow>
          <StatusLabelRow>
            <p>Active</p>
            <p>
              {statusBreakdown.active} ({percent(statusBreakdown.active, totalStatus)}%)
            </p>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFillActive
              style={{ width: `${percent(statusBreakdown.active, totalStatus)}%` }}
            />
          </StatusTrack>
        </StatusRow>

        <StatusRow>
          <StatusLabelRow>
            <p>Revoked</p>
            <p>
              {statusBreakdown.revoked} ({percent(statusBreakdown.revoked, totalStatus)}%)
            </p>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFillRevoked
              style={{ width: `${percent(statusBreakdown.revoked, totalStatus)}%` }}
            />
          </StatusTrack>
        </StatusRow>

        <StatusRow>
          <StatusLabelRow>
            <p>Verified at least once</p>
            <p>
              {verificationEngagement.verifiedAtLeastOnce} (
              {percent(verificationEngagement.verifiedAtLeastOnce, totalEngagement)}%)
            </p>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFillNeutral
              style={{
                width: `${percent(
                  verificationEngagement.verifiedAtLeastOnce,
                  totalEngagement
                )}%`,
              }}
            />
          </StatusTrack>
        </StatusRow>
      </StatusGrid>
    </SectionCard>
  );
}
