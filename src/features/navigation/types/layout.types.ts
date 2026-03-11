import type { ReactNode } from "react";

export interface LayoutProps {
  children?: ReactNode;
}

export interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}
