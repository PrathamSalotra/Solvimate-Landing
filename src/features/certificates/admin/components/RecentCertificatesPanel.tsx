import { DashboardCertificate } from "@/services/dashboard.service";
import {
  SectionCard,
  SectionHeader,
  TitleGroup,
  SectionTitle,
  EmptyState,
  StatsGrid,
  StatCard,
  SearchWrap,
  TableWrap,
  Table,
  StatusBadge,
  TableFooter,
  PerimeterCard,
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
    <>
      <SectionCard>
        <SectionHeader>
          <TitleGroup>
            <SectionTitle><div className="dot" /> Recent Certificates</SectionTitle>
          </TitleGroup>
        </SectionHeader>

        <StatsGrid>
          <StatCard>
            <span>TOTAL ISSUED</span>
            <strong>1,492</strong>
          </StatCard>
          <StatCard>
            <span>VALID RATIO</span>
            <strong className="mint">100%</strong>
          </StatCard>
          <StatCard>
            <span>LATENCY</span>
            <strong>42ms</strong>
          </StatCard>
        </StatsGrid>

        <SearchWrap>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Filter candidate, ID or role..." />
        </SearchWrap>

        {items.length === 0 ? (
          <EmptyState>No certificates found yet.</EmptyState>
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CANDIDATE</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={`${item.verificationId}-${item.createdAt}`}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{item.verificationId}</td>
                    <td>{item.candidateName}</td>
                    <td>{item.internshipRole}</td>
                    <td>
                      <StatusBadge $variant={item.status === "active" ? "active" : "revoked"}>
                        <div className="dot" />
                        {item.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <TableFooter>
              <span>{items.length} active records shown</span>
              <a href="#">
                View Full Archive
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </TableFooter>
          </TableWrap>
        )}
      </SectionCard>

      <PerimeterCard>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
        <div>
          <span className="label">PERIMETER VERIFICATION</span>
          <span className="desc">SHA-256 HMAC ON COMMIT • TLS 1.3 ENCRYPTED</span>
        </div>
      </PerimeterCard>
    </>
  );
}
