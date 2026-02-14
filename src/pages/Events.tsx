import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { events } from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type EventItem = (typeof events)[number];

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-grid-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Events</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Upcoming and past events</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-grid-4"
      >
        {events.map((ev) => (
          <motion.div key={ev.id} variants={item}>
            <EventCard
              title={ev.title}
              date={ev.date}
              venue={ev.venue}
              capacity={ev.capacity}
              registered={ev.registered}
              status={ev.status}
              daysUntil={ev.daysUntil}
              onClick={() => setSelectedEvent(ev)}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{selectedEvent.title}</h3>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {selectedEvent.date} · {selectedEvent.venue}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {selectedEvent.registered} / {selectedEvent.capacity} registered · {selectedEvent.status}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {selectedEvent.description}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
