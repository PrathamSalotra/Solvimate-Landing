import { DashboardCertificate } from "@/services/dashboard.service";
import {
  SectionCard,
  SectionTitle,
  SectionDescription,
  EmptyState,
  TableWrap,
  Table,
  StatusBadge,
} from "./RecentCertificatesPanel.styles";

function formatDateTime(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export interface RecentCertificateItem {
  verificationId: string;
  candidateName: string;
  internshipRole: string;
  status: string;
  createdAt: string | Date;
}

interface RecentCertificatesPanelProps {
  items: RecentCertificateItem[];
}

export default function RecentCertificatesPanel({
  items,
}: RecentCertificatesPanelProps) {
  return (
    <SectionCard>
      <SectionTitle>Recent Certificates</SectionTitle>
      <SectionDescription>
        Newly saved records appear here. Verification URL becomes live immediately.
      </SectionDescription>

      {items.length === 0 ? (
        <EmptyState>No certificates found yet.</EmptyState>
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.verificationId}-${item.createdAt}`}>
                  <td>{item.verificationId}</td>
                  <td>{item.candidateName}</td>
                  <td>{item.internshipRole}</td>
                  <td>
                    <StatusBadge
                      $variant={item.status === "active" ? "active" : "revoked"}
                    >
                      {item.status}
                    </StatusBadge>
                  </td>
                  <td>{formatDateTime(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </SectionCard>
  );
}
