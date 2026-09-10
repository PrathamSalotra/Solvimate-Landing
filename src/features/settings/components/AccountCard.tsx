"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  AccountLayout,
  SessionCard,
  SessionHeading,
  SessionTitle,
  SessionSubtitle,
  SessionBadge,
  AccountGrid,
  AccountItem,
  AccountLabel,
  AccountValue,
  ActionCard,
  ActionTitle,
  ActionSubtitle,
  SecurityNote,
  SignOutButton,
} from "./AccountCard.styles";

function formatTimestamp(isoDate?: string | null) {
  if (!isoDate) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

interface AccountCardProps {
  email: string;
  role: string;
  lastLoginAt?: string | null;
}

export default function AccountCard({ email, role, lastLoginAt }: AccountCardProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/admin/login" });
  }

  return (
    <AccountLayout>
      <SessionCard>
        <SessionHeading>
          <SessionBadge aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M9 7h6M9 11h6M9 15h3" />
            </svg>
          </SessionBadge>
          <div>
            <SessionTitle>Active Session &amp; Identity</SessionTitle>
            <SessionSubtitle>ROOT VERIFICATION</SessionSubtitle>
          </div>
        </SessionHeading>
        <AccountGrid>
          <AccountItem><AccountLabel>Admin Email</AccountLabel><AccountValue>{email}</AccountValue></AccountItem>
          <AccountItem><AccountLabel>Access Level</AccountLabel><AccountValue>{role.replace("_", " ")}</AccountValue></AccountItem>
          <AccountItem><AccountLabel>Last Login</AccountLabel><AccountValue>{formatTimestamp(lastLoginAt)}</AccountValue></AccountItem>
          <AccountItem><AccountLabel>Authentication</AccountLabel><AccountValue>Password + OTP</AccountValue></AccountItem>
        </AccountGrid>
      </SessionCard>
      <ActionCard>
        <SessionHeading>
          <SessionBadge $danger aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v9M5.6 6.6a9 9 0 1 0 12.8 0" /></svg>
          </SessionBadge>
          <div><ActionTitle>Session Actions</ActionTitle><ActionSubtitle>AUTHORIZATION REVOCATION</ActionSubtitle></div>
        </SessionHeading>
        <SecurityNote>
          <strong><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-3Z" /><path d="m9.5 12 1.7 1.7 3.5-3.5" /></svg>Multi-Factor Enforced</strong>
          <span>Multi-factor authentication (OTP) is required upon your next login attempt.</span>
        </SecurityNote>
        <SignOutButton type="button" onClick={handleSignOut} disabled={isSigningOut}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          {isSigningOut ? "Ending Session..." : "Sign Out & End Session"}
        </SignOutButton>
      </ActionCard>
    </AccountLayout>
  );
}
