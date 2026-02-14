import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { GlassCard } from '../components/GlassCard';
import {
  dashboardStats,
  lineChartData,
  doughnutData,
  recentActivity,
  upcomingEvents,
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

export function Dashboard() {
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
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[1].title}
            value={dashboardStats[1].value}
            icon={Calendar}
            accent={dashboardStats[1].accent}
            delay={0.05}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[2].title}
            value={dashboardStats[2].value}
            icon={Users}
            accent={dashboardStats[2].accent}
            delay={0.1}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={dashboardStats[3].title}
            value={dashboardStats[3].value}
            icon={Calendar}
            accent={dashboardStats[3].accent}
            delay={0.15}
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
            <div className="h-72">
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
            </div>
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
    </motion.div>
  );
}
