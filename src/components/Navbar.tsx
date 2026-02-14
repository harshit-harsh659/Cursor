import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import clsx from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { LoginModal } from './LoginModal';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  sidebarCollapsed: boolean;
  onMenuClick?: () => void;
  isMobile: boolean;
}

const notifications = [
  { id: '1', text: 'Hackathon is starting in 3 days', time: '2m ago' },
  { id: '2', text: 'Dance Workshop registration closes tomorrow', time: '1h ago' },
  { id: '3', text: 'Cricket Finals on Feb 18 — 180 spots left', time: '5h ago' },
  { id: '4', text: 'Tech Society meetup tomorrow at 4 PM', time: 'Yesterday' },
];

export function Navbar({ sidebarCollapsed, onMenuClick, isMobile }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifPulse, setNotifPulse] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const [showNameReveal, setShowNameReveal] = useState(false);
  const prevUserRef = useRef(user);

  useEffect(() => {
    const hadUser = !!prevUserRef.current;
    const hasUser = !!user;
    prevUserRef.current = user;
    if (!hadUser && hasUser) {
      setShowNameReveal(true);
      const t = setTimeout(() => setShowNameReveal(false), 800);
      return () => clearTimeout(t);
    }
  }, [user]);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-30 h-16 rounded-3xl mx-2 md:mx-4 mt-2 md:mt-4',
          'backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
          'flex items-center justify-between gap-grid-4 px-grid-4',
          isMobile ? 'ml-2' : sidebarCollapsed ? 'md:ml-24' : 'md:ml-64'
        )}
      >
        <div className="flex items-center gap-grid-4 flex-1 min-w-0">
          {isMobile && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="p-2 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          {!isMobile && (
            <Link to="/" className="font-semibold text-lg text-neon-cyan dark:text-neon-purple shrink-0">
              SocietyHub
            </Link>
          )}
          <div
            className={clsx(
              'flex-1 max-w-md flex items-center gap-grid-2 px-grid-3 py-grid-2 rounded-3xl border transition-all duration-300',
              searchFocused
                ? 'border-neon-cyan/50 dark:border-neon-purple/50 shadow-glow-cyan-sm dark:shadow-glow-purple-sm bg-white/5 dark:bg-black/5'
                : 'border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/5'
            )}
          >
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="search"
              placeholder="Search societies, events..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-grid-2 shrink-0">
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setNotifOpen((o) => !o);
                setProfileOpen(false);
                setNotifPulse(false);
              }}
              className="relative p-2 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              {notifPulse && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-neon-cyan dark:bg-neon-purple animate-pulse" />
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-72 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark py-2 z-50"
                >
                  <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Notifications
                  </p>
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-black/10 transition-colors border-b border-white/10 dark:border-white/5 last:border-0"
                      onClick={() => setNotifOpen(false)}
                    >
                      <span className="font-medium">{n.text}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.time}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ThemeToggle />
          <div className="relative">
            {!user ? (
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="flex flex-col items-end gap-0 px-grid-2 py-grid rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Guest</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Login</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((p) => !p);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-grid-2 px-grid-2 py-grid rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {!isMobile && (
                  <>
                    <div className="flex flex-col items-start">
                      <AnimatePresence mode="wait">
                        {showNameReveal ? (
                          <motion.span
                            key="reload"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1"
                          >
                            <span className="inline-block w-3 h-3 rounded-full border-2 border-neon-cyan dark:border-neon-purple border-t-transparent animate-spin" />
                            Loading...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="name"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            {user.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronDown className={clsx('w-4 h-4 transition-transform text-slate-500', profileOpen && 'rotate-180')} />
                  </>
                )}
              </button>
            )}
            <AnimatePresence>
              {profileOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-soft dark:shadow-soft-dark py-2 z-50"
                >
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-black/10"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-black/10"
                    onClick={() => setProfileOpen(false)}
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/10 dark:hover:bg-black/10"
                    onClick={() => { setProfileOpen(false); logout(); }}
                  >
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(name, rollNumber) => {
          login(name, rollNumber);
          setLoginOpen(false);
        }}
      />
    </>
  );
}
