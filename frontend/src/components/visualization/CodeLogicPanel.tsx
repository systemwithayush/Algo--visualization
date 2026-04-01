import React from 'react';
import { Play } from 'lucide-react';

interface CodeLogicPanelProps {
  language: string;
  codeLines: string[];
  activeLine: number | null;
  explanation: string | null;
}

const CodeLogicPanel = ({ language, codeLines, activeLine, explanation }: CodeLogicPanelProps) => {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-border shadow-xl">
      <div className="bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center justify-between px-4 py-2">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-mono text-gray-400 capitalize">{language} Logic View</span>
      </div>

      <div className="flex flex-col min-h-[300px]">
        {/* Code Editor */}
        <div className="flex-1 p-4 font-mono text-sm overflow-x-auto text-gray-300 border-b border-[#3d3d3d] bg-[#1e1e1e]">
          {codeLines.map((line, idx) => (
            <div 
              key={idx} 
              className={`flex rounded px-2 relative transition-colors ${activeLine === idx ? 'bg-[#37373d] text-white' : ''}`}
            >
              <div className="w-8 shrink-0 text-gray-500 text-right pr-4 select-none mr-2 border-r border-[#3d3d3d]">{idx + 1}</div>
              <div className="whitespace-pre flex-1">
                 {activeLine === idx && (
                    <Play className="absolute -left-1 w-3 h-3 text-green-400 mt-1 animate-pulse" />
                 )}
                 {line}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Explanation Panel */}
        <div className="w-full p-4 flex flex-col gap-3 bg-[#252526]">
          <h4 className="text-gray-400 font-semibold text-xs tracking-wider uppercase mb-2 border-b border-[#3d3d3d] pb-2">Step Reasoning</h4>
          {explanation ? (
            <div className="p-3 bg-accent-primary/20 border border-accent-primary/50 text-white rounded-lg text-sm animate-in fade-in slide-in-from-top-2">
              {explanation}
            </div>
          ) : (
             <div className="text-gray-500 text-sm italic py-4">
               Waiting for execution...
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeLogicPanel;
