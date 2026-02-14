import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

const duration = 0.5;

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={clsx(
        'relative w-14 h-14 rounded-3xl flex items-center justify-center overflow-hidden',
        'backdrop-blur-xl border border-white/20 dark:border-white/10',
        'bg-white/10 dark:bg-black/10',
        'hover:shadow-glow-cyan-sm dark:hover:shadow-glow-purple-sm',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan dark:focus-visible:ring-neon-purple',
        'transition-shadow duration-300'
      )}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 0 : 360,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          y: isDark ? 40 : 0,
        }}
        transition={{ duration, ease: 'easeInOut' }}
      >
        <Sun className="w-6 h-6 text-amber-400" strokeWidth={2} />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          y: isDark ? 0 : -40,
        }}
        transition={{ duration, ease: 'easeInOut' }}
      >
        <Moon className="w-6 h-6 text-slate-300" strokeWidth={2} />
      </motion.div>
    </button>
  );
}
