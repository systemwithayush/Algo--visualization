import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import DSAWorkspace from '../components/workspace/DSAWorkspace';

const PlaygroundDSA = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <Workflow className="text-accent-secondary" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Algorithm Mode</h1>
          <p className="text-text-secondary text-sm">Test and visualize algorithmic logic with multiple languages</p>
        </div>
      </div>
      
      <div className="flex-1">
        <DSAWorkspace />
      </div>
    </motion.div>
  );
};

export default PlaygroundDSA;
