
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  duration = 0.8, // Slower, more elegant
  y = 30, // Slightly more travel
}: AnimationProps) {
  const ref = useRef(null);

  // "once: false" enables replay on scroll up/down as requested
  const isInView = useInView(ref, { once: false, margin: '0px 0px -20% 0px' });

  const variants = {
    hidden: {
      opacity: 0,
      y,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom "premium" ease curve (cubic-bezier)
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
