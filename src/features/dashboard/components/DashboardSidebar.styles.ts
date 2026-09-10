import styled from "styled-components";
import Link from "next/link";

export const SidebarContainer = styled.aside`
  background: transparent;
  padding: 18px;
  height: fit-content;

  @media (max-width: 580px) {
    padding: 10px;
  }
`;

export const SidebarBrand = styled.p`
  margin: 0 0 24px;
  color: var(--lime);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const SidebarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 9px;
`;

export const SidebarItem = styled.li`
  margin: 0;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SidebarLinkActive = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.95rem;
  color: var(--mist);
  text-decoration: none;
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--foreground);
  }
`;

export const SidebarLinkCurrent = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.95rem;
  background: rgba(190, 254, 114, 0.1); /* Lime with opacity */
  border-left: 3px solid var(--lime);
  color: var(--lime);
  text-decoration: none;
  font-weight: 600;
`;

export const SidebarLinkMuted = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.95rem;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  cursor: default;
`;
