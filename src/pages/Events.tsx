import { motion } from 'framer-motion';
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

export function Events() {
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
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
