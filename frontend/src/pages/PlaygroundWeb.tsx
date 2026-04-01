import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import WebWorkspace from '../components/workspace/WebWorkspace';

const PlaygroundWeb = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="text-accent-primary" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Syntax Learning Mode</h1>
          <p className="text-text-secondary text-sm">Real-time HTML, CSS, and JS compilation</p>
        </div>
      </div>
      
      <div className="flex-1">
        <WebWorkspace />
      </div>
    </motion.div>
  );
};

export default PlaygroundWeb;
