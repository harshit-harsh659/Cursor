import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { GlassCard } from './GlassCard';
import clsx from 'clsx';

type EventStatus = 'upcoming' | 'live' | 'ended';

interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  capacity: number;
  registered: number;
  status: EventStatus;
}

const statusConfig: Record<EventStatus, { label: string; className: string; pulse: boolean }> = {
  upcoming: { label: 'Upcoming', className: 'bg-neon-cyan/20 text-neon-cyan', pulse: false },
  live: { label: 'Live', className: 'bg-emerald-500/20 text-emerald-400', pulse: true },
  ended: { label: 'Ended', className: 'bg-slate-500/20 text-slate-400', pulse: false },
};

export function EventCard({ title, date, venue, capacity, registered, status }: EventCardProps) {
  const percent = capacity > 0 ? Math.min(100, (registered / capacity) * 100) : 0;
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard
        className={clsx(
          'p-grid-4 h-full overflow-hidden transition-all duration-300 hover:border-neon-cyan/40 dark:hover:border-neon-purple/40 hover:shadow-glow-cyan dark:hover:shadow-glow-purple'
        )}
      >
        <div className="flex items-start justify-between gap-grid-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex-1 min-w-0">{title}</h3>
          <span
            className={clsx(
              'shrink-0 px-2 py-1 rounded-xl text-xs font-medium',
              config.className,
              config.pulse && 'animate-pulse'
            )}
          >
            {config.label}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{venue}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Capacity</span>
            <span>
              {registered} / {capacity}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
