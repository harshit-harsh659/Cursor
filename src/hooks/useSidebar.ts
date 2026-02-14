import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (mobile) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', handler);
    handler();
    return () => mq.removeEventListener('change', handler);
  }, []);

  return {
    collapsed,
    setCollapsed,
    toggleCollapsed: () => setCollapsed((c) => !c),
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu: () => setMobileMenuOpen((o) => !o),
  };
}
