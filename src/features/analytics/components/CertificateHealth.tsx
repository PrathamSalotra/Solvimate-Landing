import {
  SectionCard,
  SectionHeader,
  SectionTitle,
  SectionSubtext,
  StatusGrid,
  StatusRow,
  StatusLabelRow,
  StatusTrack,
  StatusFill,
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
      <SectionHeader>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <SectionTitle>Certificate Health</SectionTitle>
      </SectionHeader>
      <SectionSubtext>
        Status split and cryptographic verification engagement across all active credentials.
      </SectionSubtext>

      <StatusGrid>
        {/* Active Credentials */}
        <StatusRow>
          <StatusLabelRow>
            <div className="label-group">
              <div className="dot lime" />
              <p>Active Credentials</p>
            </div>
            <div>
              <span className="value">{statusBreakdown.active} </span>
              <span className="pct">({percent(statusBreakdown.active, totalStatus)}%)</span>
            </div>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFill
              $color="var(--lime)"
              style={{ width: `${percent(statusBreakdown.active, totalStatus)}%` }}
            />
          </StatusTrack>
        </StatusRow>

        {/* Revoked / Quarantined */}
        <StatusRow>
          <StatusLabelRow>
            <div className="label-group">
              <div className="dot red" />
              <p>Revoked / Quarantined</p>
            </div>
            <div>
              <span className="value">{statusBreakdown.revoked} </span>
              <span className="pct">({percent(statusBreakdown.revoked, totalStatus)}%)</span>
            </div>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFill
              $color="#ff7070"
              style={{ width: `${percent(statusBreakdown.revoked, totalStatus)}%` }}
            />
          </StatusTrack>
        </StatusRow>

        {/* Verified At Least Once */}
        <StatusRow>
          <StatusLabelRow>
            <div className="label-group">
              <div className="dot blue" />
              <p>Verified At Least Once</p>
            </div>
            <div>
              <span className="value">{verificationEngagement.verifiedAtLeastOnce} </span>
              <span className="pct">
                ({percent(verificationEngagement.verifiedAtLeastOnce, totalEngagement)}%)
              </span>
            </div>
          </StatusLabelRow>
          <StatusTrack>
            <StatusFill
              $color="var(--lime)"
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
