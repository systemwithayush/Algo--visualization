import React from 'react';
import { Info, Clock, Box, Code } from 'lucide-react';

interface AlgoInfoProps {
  title: string;
  description: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
  pseudocode: string[];
}

const AlgoInfo: React.FC<AlgoInfoProps> = ({ title, description, bestCase, averageCase, worstCase, spaceComplexity, pseudocode }) => (
  <div className="algo-info-panel mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4 text-accent-primary">
        <Info size={20} />
        <h3 className="text-xl">About {title}</h3>
      </div>
      <p className="text-text-secondary leading-relaxed">{description}</p>
      
      <div className="complexity-grid mt-6 grid grid-cols-2 gap-4">
        <div className="glass-card p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <Clock size={14} /> Time (Best)
          </div>
          <div className="font-mono font-bold">{bestCase}</div>
        </div>
        <div className="glass-card p-4 border-l-4 border-yellow-500">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <Clock size={14} /> Time (Avg)
          </div>
          <div className="font-mono font-bold">{averageCase}</div>
        </div>
        <div className="glass-card p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <Clock size={14} /> Time (Worst)
          </div>
          <div className="font-mono font-bold">{worstCase}</div>
        </div>
        <div className="glass-card p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <Box size={14} /> Space
          </div>
          <div className="font-mono font-bold">{spaceComplexity}</div>
        </div>
      </div>
    </div>

    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4 text-accent-secondary">
        <Code size={20} />
        <h3 className="text-xl">Pseudocode</h3>
      </div>
      <div className="pseudocode-container font-mono text-sm bg-black/30 p-4 rounded-lg overflow-x-auto">
        {pseudocode.map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="text-gray-600 select-none w-4">{idx + 1}</span>
            <span className="text-text-primary whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AlgoInfo;
