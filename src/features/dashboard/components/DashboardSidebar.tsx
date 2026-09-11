"use client";

import { usePathname } from "next/navigation";
import {
  SidebarContainer,
  SidebarList,
  SidebarItem,
  SidebarLinkActive,
  SidebarLinkCurrent,
  SidebarLinkMuted,
  IconWrapper,
} from "./DashboardSidebar.styles";

const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
  ),
  Certificates: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  "Content CMS": () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
};

const navigationItems = [
  { label: "Dashboard", href: "/admin/dashboard", active: true, icon: Icons.Dashboard },
  { label: "Certificates", href: "/admin/certificates", active: true, icon: Icons.Certificates },
  { label: "Content CMS", href: "/admin/cms", active: true, icon: Icons["Content CMS"] },
  { label: "Analytics", href: "/admin/analytics", active: true, icon: Icons.Analytics },
  { label: "Settings", href: "/admin/settings", active: true, icon: Icons.Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: 'var(--lime)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <SidebarList>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            if (!item.active) {
              return (
                <SidebarItem key={item.label}>
                  <SidebarLinkMuted>
                    <IconWrapper><Icon /></IconWrapper> {item.label}
                  </SidebarLinkMuted>
                </SidebarItem>
              );
            }

            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <SidebarItem key={item.label}>
                {isActive ? (
                  <SidebarLinkCurrent href={item.href} aria-current="page">
                    <IconWrapper><Icon /></IconWrapper> {item.label}
                  </SidebarLinkCurrent>
                ) : (
                  <SidebarLinkActive href={item.href}>
                    <IconWrapper><Icon /></IconWrapper> {item.label}
                  </SidebarLinkActive>
                )}
              </SidebarItem>
            );
          })}
        </SidebarList>
      </div>
      
    </SidebarContainer>
  );
}
