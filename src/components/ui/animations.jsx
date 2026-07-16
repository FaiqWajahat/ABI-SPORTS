'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animates a single section on scroll
export function AnimatedSection({ children, delay = 0, direction = 'up', className = '' }) {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Container for staggering children animations
export function StaggerContainer({ children, delay = 0, className = '', id = '' }) {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered child item
export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Hover zoom effect wrapper
export function HoverZoom({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover button effect
export function HoverButton({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
