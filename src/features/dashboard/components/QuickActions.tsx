import {
  SectionCard,
  SectionTitle,
  SectionSubtext,
  ActionsGrid,
  ActionCard,
  ActionLabel,
  ActionText,
  ActionButton,
  ActionButtonMuted,
} from "./QuickActions.styles";

const quickActions = [
  {
    label: "Open Public Search",
    text: "Jump to the public certificate search experience.",
    href: "/certificate-search",
    ready: true,
  },
  {
    label: "Upload Certificate",
    text: "Upload PDF/PNG to Cloudinary and save verification metadata.",
    href: "/admin/certificates",
    ready: true,
  },
  {
    label: "Manage CMS Content",
    text: "Edit applications, internships, news, and services content blocks.",
    href: "/admin/cms",
    ready: true,
  },
  {
    label: "View Analytics",
    text: "Certificate issuance trends, department breakdown, and verification health.",
    href: "/admin/analytics",
    ready: true,
  },
  {
    label: "Manage Admins",
    text: "Review admin accounts, roles, and access from Settings.",
    href: "/admin/settings",
    ready: true,
  },
];

export default function QuickActions() {
  return (
    <SectionCard>
      <SectionTitle>Quick Actions</SectionTitle>
      <SectionSubtext>
        High-priority admin actions for the next migration steps.
      </SectionSubtext>

      <ActionsGrid>
        {quickActions.map((action) => (
          <ActionCard key={action.label}>
            <ActionLabel>{action.label}</ActionLabel>
            <ActionText>{action.text}</ActionText>
            {action.ready ? (
              <ActionButton href={action.href}>Open</ActionButton>
            ) : (
              <ActionButtonMuted>Coming Next</ActionButtonMuted>
            )}
          </ActionCard>
        ))}
      </ActionsGrid>
    </SectionCard>
  );
}
