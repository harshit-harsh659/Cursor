import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Users } from 'lucide-react';
import { GlassCard } from './GlassCard';
import clsx from 'clsx';

interface SocietyCardProps {
  name: string;
  description: string;
  members: number;
  eventsCount: number;
  category: string;
}

export function SocietyCard({ name, description, members, eventsCount, category }: SocietyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const tiltMax = 12;
    const rotateXValue = (mouseY / (rect.height / 2)) * -tiltMax;
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltMax;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    scale.set(1.03);
  };

  const transform = useMotionTemplate`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

  return (
    <motion.div
      ref={cardRef}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="cursor-pointer"
    >
      <GlassCard
        className={clsx(
          'p-grid-4 h-full transition-all duration-300',
          isHovering && 'border-neon-cyan/40 dark:border-neon-purple/40 shadow-glow-cyan dark:shadow-glow-purple'
        )}
      >
        <div className="flex items-start gap-grid-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-neon-cyan dark:text-neon-purple" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-medium text-neon-cyan dark:text-neon-purple uppercase tracking-wide">
              {category}
            </span>
            <h3 className="mt-1 font-semibold text-slate-800 dark:text-slate-100 truncate">{name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{description}</p>
            <div className="mt-3 flex gap-grid-4 text-sm text-slate-500 dark:text-slate-400">
              <span>{members} members</span>
              <span>{eventsCount} events</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
