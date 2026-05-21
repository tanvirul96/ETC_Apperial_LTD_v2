import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium luxury PageTransition wrapper.
 * Animates page mounting with subtle fade and ease-out slide-up.
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Elegant easeOutQuint curve
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
