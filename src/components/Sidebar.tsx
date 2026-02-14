import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/societies', icon: Users, label: 'Societies' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/ai', icon: Sparkles, label: 'AI' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({ collapsed, onToggle, isMobile }: SidebarProps) {
  if (isMobile) return null;

  return (
    <motion.aside
      className="hidden md:flex flex-col fixed left-0 top-0 z-40 h-screen overflow-hidden rounded-r-3xl border-r border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/10"
      initial={false}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full p-grid-2 min-w-0">
        <div className="flex items-center justify-between h-14 shrink-0">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.span
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-lg text-neon-cyan dark:text-neon-purple whitespace-nowrap"
              >
                SocietyHub
              </motion.span>
            ) : (
              <motion.span
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-neon-cyan dark:text-neon-purple text-xl font-bold"
              >
                S
              </motion.span>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-2 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-grid mt-grid-6">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-grid-3 px-grid-3 py-grid-2 rounded-3xl transition-colors duration-200',
                  isActive
                    ? 'bg-neon-cyan/20 dark:bg-neon-purple/20 text-neon-cyan dark:text-neon-purple shadow-glow-cyan-sm dark:shadow-glow-purple-sm'
                    : 'hover:bg-white/10 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden font-medium"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
