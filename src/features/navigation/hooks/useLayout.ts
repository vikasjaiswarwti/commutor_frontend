import { useState, useEffect } from "react";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";

export const useLayout = () => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return {
    sidebarCollapsed,
    mobileMenuOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
  };
};
