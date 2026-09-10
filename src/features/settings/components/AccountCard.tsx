import {
  SectionCard,
  SectionTitle,
  SectionSubtext,
  AccountGrid,
  AccountItem,
  AccountLabel,
  AccountValue,
} from "./AccountCard.styles";

function formatTimestamp(isoDate?: string | null) {
  if (!isoDate) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

interface AccountCardProps {

  lastLoginAt?: string | null;
}

export default function AccountCard({ lastLoginAt }: AccountCardProps) {
  return (
    <SectionCard>
      <SectionTitle>Your Account</SectionTitle>
      <SectionSubtext>Signed-in admin identity for this session.</SectionSubtext>

      <AccountGrid>

        <AccountItem>
          <AccountLabel>Last Login</AccountLabel>
          <AccountValue>{formatTimestamp(lastLoginAt)}</AccountValue>
        </AccountItem>
      </AccountGrid>
    </SectionCard>
  );
}
