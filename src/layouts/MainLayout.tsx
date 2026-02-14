import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { useSidebar } from '../hooks/useSidebar';

const mobileNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/societies', icon: Users, label: 'Societies' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/ai', icon: Sparkles, label: 'AI' },
];

export function MainLayout() {
  const location = useLocation();
  const { collapsed, toggleCollapsed, isMobile, mobileMenuOpen, toggleMobileMenu } = useSidebar();

  return (
    <div className="min-h-screen flex">
      <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} isMobile={isMobile} />

      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 z-50 h-full w-72 rounded-r-3xl border-r border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/10 p-4"
          >
            <nav className="flex flex-col gap-2 mt-16">
              {mobileNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-4 py-3 rounded-3xl',
                      isActive
                        ? 'bg-neon-cyan/20 dark:bg-neon-purple/20 text-neon-cyan dark:text-neon-purple'
                        : 'text-slate-700 dark:text-slate-300'
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          sidebarCollapsed={collapsed}
          onMenuClick={toggleMobileMenu}
          isMobile={isMobile}
        />
        <main
          className={clsx(
            'flex-1 p-grid-4 transition-[margin] duration-300',
            isMobile ? 'pb-24' : collapsed ? 'md:ml-20' : 'md:ml-60'
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around py-2 px-2 rounded-t-3xl border-t border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/10">
          {mobileNavItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded-2xl min-w-[64px]',
                  isActive
                    ? 'text-neon-cyan dark:text-neon-purple bg-white/10 dark:bg-black/10'
                    : 'text-slate-500 dark:text-slate-400'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
