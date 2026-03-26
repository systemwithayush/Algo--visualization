import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BarProps {
  value: number;
  status: 'default' | 'comparing' | 'swapping' | 'sorted';
  width: number;
}

const Bar: React.FC<BarProps> = ({ value, status, width }) => {
  const getColor = () => {
    switch (status) {
      case 'comparing': return '#fcd34d'; // Yellow
      case 'swapping': return '#ef4444';  // Red
      case 'sorted': return '#10b981';    // Green
      default: return '#6366f1';          // Indigo/Accent
    }
  };

  return (
    <motion.div
      layout
      className="visualizer-bar"
      style={{
        height: `${value}%`,
        width: `${width}%`,
        backgroundColor: getColor(),
        borderRadius: '4px 4px 0 0',
      }}
      initial={{ height: 0 }}
      animate={{ height: `${value}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  );
};

export default Bar;
