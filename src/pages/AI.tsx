import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export function AI() {
  const [input, setInput] = useState('');
  const [suggestions] = useState([
    'Suggest events for Tech Society',
    'Which societies match my interests?',
    'Best time to host a workshop',
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-grid-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">AI Recommendations</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Get smart suggestions for societies and events</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <GlassCard className="p-grid-6 overflow-hidden" hover={false}>
          <div className="absolute top-4 right-4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-neon-cyan dark:bg-neon-purple"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mb-grid-4">
            <motion.div
              className="p-2 rounded-2xl bg-neon-cyan/20 dark:bg-neon-purple/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-neon-cyan dark:text-neon-purple" />
            </motion.div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">AI Assistant</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ask for society or event recommendations</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setInput(s)}
                  className="px-3 py-2 rounded-2xl text-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 hover:border-neon-cyan/50 dark:hover:border-neon-purple/50 transition-colors text-slate-700 dark:text-slate-300"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about societies or events..."
                className="flex-1 px-4 py-3 rounded-3xl bg-white/5 dark:bg-black/5 border border-white/20 dark:border-white/10 focus:border-neon-cyan dark:focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 dark:focus:ring-neon-purple/20 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 rounded-3xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-medium shadow-glow-cyan-sm dark:shadow-glow-purple-sm hover:shadow-glow-cyan dark:hover:shadow-glow-purple transition-shadow"
              >
                Ask
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <FloatingChatbot />
    </motion.div>
  );
}

function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open chatbot"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white flex items-center justify-center shadow-glow-cyan dark:shadow-glow-purple"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute -inset-1 rounded-full bg-neon-cyan/30 dark:bg-neon-purple/30 animate-pulse ring-2 ring-neon-cyan/50 dark:ring-neon-purple/50" />
        <MessageCircle className="w-6 h-6 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-40 right-6 z-50 w-80 rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-soft dark:shadow-soft-dark p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Chat</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Hi! How can I help with societies or events?</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
