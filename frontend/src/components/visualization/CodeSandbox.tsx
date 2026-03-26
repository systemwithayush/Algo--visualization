import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, FileCode } from 'lucide-react';

const CodeSandbox = () => {
  const [code, setCode] = useState(`// Bubble Sort implementation in JavaScript
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const data = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", data);
console.log("Sorted:", bubbleSort(data));`);

  const [output, setOutput] = useState<string[]>([]);
  const [visualData, setVisualData] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runCode = async () => {
    setOutput(['> Initializing execution trace...', '> Mapping code logic to visualizer...']);
    const data = [...visualData];
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        setOutput(prev => [`Comparing ${data[j]} & ${data[j+1]}`].concat(prev).slice(0, 15));
        await sleep(400);
        
        if (data[j] > data[j + 1]) {
          setOutput(prev => [`SWAP: ${data[j]} <-> ${data[j+1]}`].concat(prev).slice(0, 15));
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
          setVisualData([...data]);
          await sleep(400);
        }
      }
    }
    setActiveIndices([]);
    setOutput(prev => ['> Execution complete. Visualization synced.'].concat(prev));
  };

  return (
    <div className="code-sandbox-visualizer glass-card p-6">
      <div className="controls flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-accent-primary">
          <FileCode size={20} />
          <span className="font-bold">Algorithm Playground</span>
        </div>
        <div className="flex gap-2">
          <button className="nav-item active" onClick={() => setCode('')}>
            <RotateCcw size={18} /> Clear
          </button>
          <button className="nav-item active" onClick={runCode}>
            <Play size={18} /> Run Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="glass-card overflow-hidden border border-glass-border">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="glass-card p-4 bg-black/20 flex flex-col gap-4">
            <div className="text-xs font-bold text-text-secondary uppercase">Live Trace Visualization</div>
            <div className="flex items-end justify-center gap-2 h-32 border-b border-glass-border pb-2">
              {visualData.map((val, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className="bg-accent-primary flex flex-col items-center justify-end rounded-t-sm transition-all"
                  style={{ 
                    height: `${val}%`, 
                    width: '30px',
                    opacity: activeIndices.includes(idx) ? 1 : 0.4,
                    boxShadow: activeIndices.includes(idx) ? 'var(--neon-shadow)' : 'none',
                    border: activeIndices.includes(idx) ? '2px solid white' : 'none'
                  }}
                >
                  <span className="text-[10px] mb-1 font-bold">{val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-card p-4 flex flex-col bg-black/40 h-[560px]">
          <div className="text-sm font-bold text-text-secondary mb-4 border-b border-glass-border pb-2">EXECUTION LOGS</div>
          <div className="flex-1 font-mono text-sm overflow-auto">
            {output.map((line, idx) => (
              <div key={idx} className="mb-1 text-green-400">{line}</div>
            ))}
            {output.length === 0 && <div className="text-gray-600">Waiting for execution...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSandbox;
