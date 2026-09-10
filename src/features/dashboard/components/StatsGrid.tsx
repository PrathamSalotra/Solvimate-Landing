import { DashboardStats } from "@/services/dashboard.service";
import {
  StatsGridContainer,
  StatCard,
  StatHeader,
  StatLabel,
  StatIconBox,
  StatValue,
  StatBarContainer,
  StatBarFill,
  StatFooter,
  StatCaption,
  StatMeta,
} from "./StatsGrid.styles";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      label: "Total Certificates",
      value: stats.totalCertificates,
      caption: "All issued records",
      meta: "100% ISSUED",
      metaHighlight: false,
      barWidth: 100,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
      highlight: true
    },
    {
      label: "Verified",
      value: stats.verifiedCertificates,
      caption: "Currently active",
      meta: "VALIDATED",
      metaHighlight: true,
      barWidth: 100,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
      highlight: true
    },
    {
      label: "Revoked",
      value: stats.revokedCertificates,
      caption: "Marked invalid",
      meta: "CLEAN REPO",
      metaHighlight: false,
      barWidth: 0,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
      highlight: false
    },
    {
      label: "Verification Count",
      value: stats.totalVerificationCount,
      caption: "Total lookups",
      meta: "+18.4% HIGH",
      metaHighlight: false,
      barWidth: 65,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      highlight: false
    },
  ];

  return (
    <StatsGridContainer>
      {items.map((item) => (
        <StatCard key={item.label}>
          <StatHeader>
            <StatLabel>{item.label}</StatLabel>
            <StatIconBox className={item.highlight ? "highlight" : ""}>{item.icon}</StatIconBox>
          </StatHeader>
          <StatValue>{formatNumber(item.value)}</StatValue>
          
          <StatBarContainer>
            <StatBarFill $width={item.barWidth} $color={item.highlight ? "var(--lime)" : "var(--mist)"} />
          </StatBarContainer>
          
          <StatFooter>
            <StatCaption>{item.caption}</StatCaption>
            <StatMeta className={item.metaHighlight ? "highlight" : ""}>{item.meta}</StatMeta>
          </StatFooter>
        </StatCard>
      ))}
    </StatsGridContainer>
  );
}
