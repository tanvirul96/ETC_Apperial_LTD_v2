import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, size = "md" }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[9999] flex items-center justify-center bg-surface overflow-hidden" 
    : "flex items-center justify-center p-8";

  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  const circleSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={containerClasses}>
      {/* Background Noise for Premium Feel */}
      {fullScreen && <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none"></div>}
      
      <div className="relative flex flex-col items-center">
        <motion.div
          className={`${circleSize} relative`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer Ring */}
          <motion.div 
            className="absolute inset-0 border-t-2 border-r-2 border-secondary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Ring */}
          <motion.div 
            className="absolute inset-2 border-b-2 border-l-2 border-primary/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Pulsing Dot */}
          <motion.div 
            className="absolute inset-[40%] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Text Animation */}
        <motion.div 
          className="mt-8 overflow-hidden h-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p 
            className="font-headline italic text-xl md:text-2xl text-primary font-black tracking-widest uppercase"
            animate={{ 
              y: [20, 0, 0, -20],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut" 
            }}
          >
            Atelier
          </motion.p>
          <motion.p 
            className="font-headline italic text-xl md:text-2xl text-primary font-black tracking-widest uppercase absolute top-0"
            animate={{ 
              y: [20, 20, 0, 0],
              opacity: [0, 0, 1, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              times: [0, 0.5, 0.7, 1],
              ease: "easeInOut" 
            }}
          >
            Creative
          </motion.p>
        </motion.div>

        {/* Decorative Lines */}
        <motion.div 
          className="mt-2 w-12 h-[1px] bg-secondary/50"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
};

export default Loader;
