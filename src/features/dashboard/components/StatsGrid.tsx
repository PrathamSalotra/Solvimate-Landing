import { DashboardStats } from "@/services/dashboard.service";
import {
  StatsGridContainer,
  StatCard,
  StatHeader,
  StatLabel,
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
      highlight: true
    },
    {
      label: "Verified",
      value: stats.verifiedCertificates,
      caption: "Currently active",
      meta: "VALIDATED",
      metaHighlight: true,
      barWidth: 100,
      highlight: true
    },
    {
      label: "Revoked",
      value: stats.revokedCertificates,
      caption: "Marked invalid",
      meta: "CLEAN REPO",
      metaHighlight: false,
      barWidth: 0,
      highlight: false
    },
    {
      label: "Verification Count",
      value: stats.totalVerificationCount,
      caption: "Total lookups",
      meta: "+18.4% HIGH",
      metaHighlight: false,
      barWidth: 65,
      highlight: false
    },
  ];

  return (
    <StatsGridContainer>
      {items.map((item) => (
        <StatCard key={item.label}>
          <StatHeader>
            <StatLabel>{item.label}</StatLabel>
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
