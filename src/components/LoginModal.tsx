import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, rollNumber: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setName(v);
  };

  const handleRollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '');
    setRollNumber(v);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedRoll = rollNumber.trim();
    if (!trimmedName || !trimmedRoll) return;
    onLogin(trimmedName, trimmedRoll);
    setName('');
    setRollNumber('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 z-[100] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-6"
          >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Login</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Name
            </label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Letters only"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan dark:focus:ring-neon-purple focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="login-roll" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Roll number
            </label>
            <input
              id="login-roll"
              type="text"
              inputMode="numeric"
              value={rollNumber}
              onChange={handleRollChange}
              placeholder="Numbers only"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan dark:focus:ring-neon-purple focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-cyan dark:focus:ring-neon-purple"
          >
            Login
          </button>
        </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
