"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  HeaderContainer,
  TopRow,
  TopLeft,
  HeadingGroup,
  TitleGroup,
  Eyebrow,
  Title,
  Subtitle,
  ActionGroup,
  SignOutButton,
} from "./DashboardHeader.styles";

function formatToday() {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date());
}

interface DashboardHeaderProps {

  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({
  eyebrow = "ADMIN COMMAND CENTER",
  title = "Dashboard",
  subtitle = "Track certificate health, verification trends, and key admin actions from one place.",
}: DashboardHeaderProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/admin/login" });
  }

  return (
    <HeaderContainer>
      <TopRow>
        <TopLeft>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span>Solvimate Ops / Control Plane &bull; {formatToday()}</span>
        </TopLeft>
      </TopRow>

      <HeadingGroup>
        <TitleGroup>
          <Eyebrow>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--mint)', boxShadow: '0 0 6px var(--mint)' }}></div>
            {eyebrow}
          </Eyebrow>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleGroup>

        <ActionGroup>
          <SignOutButton type="button" onClick={handleSignOut} disabled={isSigningOut}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </SignOutButton>
        </ActionGroup>
      </HeadingGroup>
    </HeaderContainer>
  );
}
