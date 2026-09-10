import {
  DashboardCertificate,
  DashboardVerification,
} from "@/services/dashboard.service";
import {
  SectionCard,
  SectionTitle,
  SectionSubtext,
  FeedGroup,
  ActionLabel,
  FeedList,
  FeedItem,
  FeedMeta,
  StatusBadge,
  EmptyState,
} from "./ActivityFeed.styles";

function formatTimestamp(isoDate?: string) {
  if (!isoDate) {
    return "Not available";
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

interface ActivityFeedProps {
  recentCertificates: DashboardCertificate[];
  recentVerifications: DashboardVerification[];
}

export default function ActivityFeed({
  recentCertificates,
  recentVerifications,
}: ActivityFeedProps) {
  return (
    <SectionCard>
      <SectionTitle>Activity Feed</SectionTitle>
      <SectionSubtext>
        Latest certificate issues and most recent successful verification events.
      </SectionSubtext>

      <FeedGroup>
        <ActionLabel>Recent Certificates</ActionLabel>
        {recentCertificates.length === 0 ? (
          <EmptyState>No certificates created yet.</EmptyState>
        ) : (
          <FeedList>
            {recentCertificates.map((item) => (
              <FeedItem key={item.verificationId}>
                <FeedMeta>
                  <p>{item.candidateName}</p>
                  <p>ID: {item.verificationId}</p>
                  <p>Created: {formatTimestamp(item.createdAt)}</p>
                </FeedMeta>
                <StatusBadge $variant={item.status === "active" ? "active" : "revoked"}>
                  {item.status}
                </StatusBadge>
              </FeedItem>
            ))}
          </FeedList>
        )}
      </FeedGroup>

      <FeedGroup>
        <ActionLabel>Recent Verifications</ActionLabel>
        {recentVerifications.length === 0 ? (
          <EmptyState>No verification events recorded yet.</EmptyState>
        ) : (
          <FeedList>
            {recentVerifications.map((item) => (
              <FeedItem key={`${item.verificationId}-${item.verifiedAt}`}>
                <FeedMeta>
                  <p>{item.candidateName}</p>
                  <p>ID: {item.verificationId}</p>
                  <p>Verified: {formatTimestamp(item.verifiedAt)}</p>
                </FeedMeta>
                <StatusBadge $variant="active">
                  {item.verificationCount} checks
                </StatusBadge>
              </FeedItem>
            ))}
          </FeedList>
        )}
      </FeedGroup>
    </SectionCard>
  );
}
