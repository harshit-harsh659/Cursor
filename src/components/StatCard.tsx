import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  accent?: 'cyan' | 'purple';
  delay?: number;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function StatCard({ title, value, suffix = '', icon: Icon, accent = 'cyan', delay = 0 }: StatCardProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start - delay;
      const t = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOutQuart(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame((now) => tick(now + delay));
    return () => cancelAnimationFrame(raf);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <GlassCard className="p-grid-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
              {display.toLocaleString()}
              {suffix}
            </p>
          </div>
          <div
            className={clsx(
              'p-grid-2 rounded-2xl',
              accent === 'cyan' && 'bg-neon-cyan/20 text-neon-cyan',
              accent === 'purple' && 'bg-neon-purple/20 text-neon-purple'
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
