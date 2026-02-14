import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Users, Calendar, X } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { GlassCard } from '../components/GlassCard';
import {
  dashboardStats,
  lineChartData,
  doughnutData,
  recentActivity,
  upcomingEvents,
  societies,
  events,
  membersByYear,
  eventDatesInFebruary,
} from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const activeEventsList = events.filter((e) => e.status === 'live' || e.status === 'upcoming').slice(0, 5);
const maxMembersYear = Math.max(...membersByYear.map((y) => y.members));

const FEB_DAYS = 28;
const FEB_FIRST_WEEKDAY = 6;

function CalendarGrid() {
  const days = Array.from({ length: FEB_DAYS }, (_, idx) => idx + 1);
  const blanks = Array.from({ length: FEB_FIRST_WEEKDAY }, () => null);
  const all = [...blanks, ...days];

  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div key={d} className="text-xs font-medium text-slate-500 dark:text-slate-400 py-1">
          {d}
        </div>
      ))}
      {all.map((d, i) =>
        d === null ? (
          <div key={`b-${i}`} />
        ) : (
          <div
            key={d}
            className={`
              aspect-square flex items-center justify-center rounded-xl text-sm font-medium
              ${eventDatesInFebruary.includes(d) ? 'bg-neon-cyan/30 dark:bg-neon-purple/30 text-neon-cyan dark:text-neon-purple ring-1 ring-neon-cyan/50 dark:ring-neon-purple/50' : 'text-slate-600 dark:text-slate-400'}
            `}
          >
            {d}
          </div>
        )
      )}
    </div>
  );
}

export function Dashboard() {
  const [societiesOpen, setSocietiesOpen] = useState(false);
  const [activeEventsOpen, setActiveEventsOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [upcomingCalendarOpen, setUpcomingCalendarOpen] = useState(false);
  const [pieActiveIndex, setPieActiveIndex] = useState<number | undefined>(undefined);

  const renderPieActiveShape = (props: unknown) => {
    const p = props as { outerRadius?: number } & Record<string, unknown>;
    return (
      <Sector
        {...(p as Record<string, unknown>)}
        outerRadius={(p.outerRadius ?? 80) + 8}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
          transition: 'all 0.25s ease-out',
        }}
      />
    );
  };

  const renderPieLabel = (props: { name?: string; percent?: number; index?: number; x?: number; y?: number; textAnchor?: 'start' | 'middle' | 'end' }) => {
    const isActive = props.index === pieActiveIndex;
    return (
      <text
        x={props.x}
        y={props.y}
        textAnchor={(props.textAnchor ?? 'middle') as 'start' | 'middle' | 'end'}
        fill="currentColor"
        className={isActive ? 'fill-neon-cyan dark:fill-neon-purple font-semibold' : 'fill-slate-600 dark:fill-slate-400'}
        style={{
          fontSize: isActive ? 14 : 11,
          transition: 'all 0.25s ease-out',
        }}
      >
        {props.name} {props.percent != null ? `${(props.percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-grid-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Overview of your society management</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-4"
      >
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[0].title}
            value={dashboardStats[0].value}
            icon={Users}
            accent={dashboardStats[0].accent}
            delay={0}
            onClick={() => setSocietiesOpen(true)}
            tint="sky"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[1].title}
            value={dashboardStats[1].value}
            icon={Calendar}
            accent={dashboardStats[1].accent}
            delay={0.05}
            onClick={() => setActiveEventsOpen(true)}
            tint="violet"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[2].title}
            value={dashboardStats[2].value}
            icon={Users}
            accent={dashboardStats[2].accent}
            delay={0.1}
            onClick={() => setMembersOpen(true)}
            tint="teal"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[3].title}
            value={dashboardStats[3].value}
            icon={Calendar}
            accent={dashboardStats[3].accent}
            delay={0.15}
            onClick={() => setUpcomingCalendarOpen(true)}
            tint="indigo"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-4">
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <GlassCard className="p-grid-4" hover={false}>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-grid-4">
              Events & Registrations
            </h2>
            <motion.div
              className="h-72"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
                  <YAxis className="text-xs" stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '1rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(24px)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="events"
                    stroke="#00f5ff"
                    strokeWidth={2}
                    dot={{ fill: '#00f5ff' }}
                    name="Events"
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ fill: '#a855f7' }}
                    name="Registrations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </GlassCard>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show">
          <GlassCard className="p-grid-4" hover={false}>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-grid-4">
              Society Distribution
            </h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={doughnutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderPieLabel}
                    labelLine
                    activeIndex={pieActiveIndex}
                    activeShape={renderPieActiveShape}
                    onMouseEnter={(_, index) => setPieActiveIndex(index)}
                    onMouseLeave={() => setPieActiveIndex(undefined)}
                    isAnimationActive
                    animationDuration={300}
                  >
                    {doughnutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-4">
        <motion.div variants={item} initial="hidden" animate="show">
          <GlassCard className="p-grid-4" hover={false}>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-grid-4">
              Recent Activity
            </h2>
            <ul className="space-y-3">
              {recentActivity.map((act) => (
                <li
                  key={act.id}
                  className="flex items-center justify-between py-2 px-3 rounded-2xl hover:bg-white/5 dark:hover:bg-black/5 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{act.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{act.society}</p>
                  </div>
                  <span className="text-xs text-slate-400">{act.time}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show">
          <GlassCard className="p-grid-4" hover={false}>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-grid-4">
              Upcoming Events
            </h2>
            <ul className="space-y-3">
              {upcomingEvents.map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-center gap-3 py-3 px-3 rounded-2xl hover:bg-white/5 dark:hover:bg-black/5 transition-colors border-l-2 border-neon-cyan dark:border-neon-purple pl-4"
                >
                  <Calendar className="w-5 h-5 text-neon-cyan dark:text-neon-purple shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{ev.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {ev.date} · {ev.venue}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>

      <AnimatePresence>
        {societiesOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setSocietiesOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Total Societies</h3>
                <button type="button" aria-label="Close" onClick={() => setSocietiesOpen(false)} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {societies.slice(0, 4).map((s, i) => {
                  const tints = ['border-sky-500/70', 'border-violet-500/70', 'border-teal-500/70', 'border-indigo-500/70'];
                  return (
                    <li key={s.id} className={`text-sm text-slate-700 dark:text-slate-300 py-2 pl-3 border-l-4 rounded-r-lg ${tints[i]} bg-slate-50/50 dark:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700 last:border-0`}>
                      {s.name}
                    </li>
                  );
                })}
                <li className="text-sm text-slate-500 dark:text-slate-400 pt-2 pl-3">...</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeEventsOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setActiveEventsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Active Events</h3>
                <button type="button" aria-label="Close" onClick={() => setActiveEventsOpen(false)} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {activeEventsList.map((e, i) => {
                  const tints = ['border-violet-500/70', 'border-purple-500/70', 'border-fuchsia-500/70', 'border-indigo-500/70', 'border-sky-500/70'];
                  return (
                    <li key={e.id} className={`text-sm text-slate-700 dark:text-slate-300 py-2 pl-3 border-l-4 rounded-r-lg ${tints[i % tints.length]} bg-slate-50/50 dark:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700 last:border-0`}>
                      <span className="font-medium">{e.title}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">{e.date} · {e.venue}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {membersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setMembersOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Members by Year</h3>
                <button type="button" aria-label="Close" onClick={() => setMembersOpen(false)} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-2">
                {membersByYear.map((y, i) => {
                  const tints = ['border-teal-500/70', 'border-emerald-500/70', 'border-cyan-500/70', 'border-sky-500/70'];
                  const isMax = y.members === maxMembersYear;
                  return (
                    <li key={y.year} className={`flex items-center justify-between text-sm py-2 pl-3 border-l-4 rounded-r-lg ${tints[i]} bg-slate-50/50 dark:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700 last:border-0`}>
                      <span className="text-slate-700 dark:text-slate-300">{y.year}</span>
                      <span className={`font-medium ${isMax ? 'text-neon-cyan dark:text-neon-purple' : 'text-slate-600 dark:text-slate-400'}`}>
                        {y.members} members
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {upcomingCalendarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setUpcomingCalendarOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">February — Event dates</h3>
                <button type="button" aria-label="Close" onClick={() => setUpcomingCalendarOpen(false)} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Highlighted dates have events.</p>
              <CalendarGrid />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
