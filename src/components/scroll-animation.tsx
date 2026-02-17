'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

type AnimationProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  offset?: number;
};

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  duration = 0.45,
  direction = 'up',
  offset = 30,
}: AnimationProps) {
  const ref = useRef(null);

  // once: false — AOS-style re-triggering on scroll up/down
  const isInView = useInView(ref, { once: false, margin: '-8% 0px -8% 0px' });

  const getInitialVariants = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: offset, x: 0 };
      case 'down':
        return { opacity: 0, y: -offset, x: 0 };
      case 'left':
        return { opacity: 0, x: -offset, y: 0 };
      case 'right':
        return { opacity: 0, x: offset, y: 0 };
      default:
        return { opacity: 0, y: offset, x: 0 };
    }
  };

  const variants = {
    hidden: getInitialVariants(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        duration: duration,
        ease: "easeOut",
        delay: delay * 0.06,
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={cn(className)}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
