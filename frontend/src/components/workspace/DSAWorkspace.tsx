import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, FileCode } from 'lucide-react';
import SplitLayout from './SplitLayout';

type Language = 'javascript' | 'python' | 'java' | 'cpp';

const DEFAULT_CODES: Record<Language, string> = {
  javascript: `// Bubble Sort in JavaScript
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
console.log("Sorted:", bubbleSort(data));`,
  python: `# Bubble Sort in Python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

data = [64, 34, 25, 12, 22, 11, 90]
print("Original:", data)
print("Sorted:", bubble_sort(data))`,
  java: `// Bubble Sort in Java
public class Main {
    public static void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
    public static void main(String args[]) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(data);
    }
}`,
  cpp: `// Bubble Sort in C++
#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data)/sizeof(data[0]);
    bubbleSort(data, n);
    return 0;
}`
};

const DSAWorkspace = () => {
  const [activeLang, setActiveLang] = useState<Language>('javascript');
  const [code, setCode] = useState(DEFAULT_CODES['javascript']);
  const [output, setOutput] = useState<string[]>([]);
  const [visualData, setVisualData] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLangChange = (lang: Language) => {
    setActiveLang(lang);
    setCode(DEFAULT_CODES[lang]);
    setVisualData([64, 34, 25, 12, 22, 11, 90]);
    setOutput([]);
    setActiveIndices([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Simulate execution driving visualizer for learning modes
  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisualData([64, 34, 25, 12, 22, 11, 90]); // reset data
    setOutput(['> Compiling code...', '> Success. Execution started...']);
    const data = [64, 34, 25, 12, 22, 11, 90];
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        setOutput(prev => [`Comparing arr[${j}] and arr[${j+1}]`].concat(prev).slice(0, 15));
        await sleep(300);
        
        if (data[j] > data[j + 1]) {
          setOutput(prev => [`SWAP: ${data[j]} <-> ${data[j+1]}`].concat(prev).slice(0, 15));
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
          setVisualData([...data]);
          await sleep(300);
        }
      }
    }
    setActiveIndices([]);
    setOutput(prev => ['> Execution complete. Visualization synced.'].concat(prev));
    setIsRunning(false);
  };

  const leftPane = (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-r border-glass-border">
      <div className="flex items-center justify-between p-2 border-b border-glass-border bg-black/40">
        <div className="flex gap-1 overflow-x-auto">
          {(['javascript', 'python', 'java', 'cpp'] as Language[]).map((lang) => (
            <button 
              key={lang}
              className={`px-3 py-1 text-xs font-bold uppercase rounded ${activeLang === lang ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-white'}`}
              onClick={() => handleLangChange(lang)}
            >
              {lang === 'javascript' ? 'JS' : lang}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-white px-2" onClick={() => setCode('')}>
            <RotateCcw size={14} /> Clear
          </button>
          <button 
            className={`flex items-center gap-1 text-xs px-3 py-1 rounded bg-accent-secondary text-white font-bold hover:brightness-110 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={runSimulation}
            disabled={isRunning}
          >
            <Play size={14} /> Run
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={activeLang}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );

  const rightPane = (
    <div className="flex flex-col h-full bg-black/40 p-4 relative">
       <div className="text-sm font-bold text-accent-primary mb-4 flex items-center gap-2">
         <FileCode size={16}/> Algorithm Visualizer
       </div>
       
       <div className="flex-1 glass-card p-6 flex flex-col justify-end gap-2 border border-glass-border relative overflow-hidden mb-4">
         <div className="absolute top-4 left-4 text-xs font-bold text-text-secondary uppercase">Array State</div>
         <div className="flex items-end justify-center gap-2 md:gap-4 h-full pt-10">
           {visualData.map((val, idx) => (
             <motion.div
               key={idx}
               layout
               className="bg-accent-secondary flex flex-col items-center justify-end rounded-t-lg transition-all"
               style={{ 
                 height: `${Math.max(10, (val / 100) * 100)}%`, 
                 width: '40px',
                 opacity: activeIndices.includes(idx) ? 1 : 0.6,
                 boxShadow: activeIndices.includes(idx) ? '0 0 15px var(--accent-secondary)' : 'none',
                 border: activeIndices.includes(idx) ? '2px solid white' : 'none'
               }}
             >
               <span className="text-xs mb-2 font-bold text-white shadow-sm">{val}</span>
             </motion.div>
           ))}
         </div>
       </div>

       <div className="h-1/3 glass-card p-4 flex flex-col border border-glass-border bg-black/60">
         <div className="text-xs font-bold text-text-secondary mb-2 uppercase border-b border-glass-border pb-2">Execution Logs</div>
         <div className="flex-1 font-mono text-xs overflow-auto">
           {output.map((line, idx) => (
             <div key={idx} className="mb-1 text-green-400">{line}</div>
           ))}
           {output.length === 0 && <div className="text-text-secondary italic">Ready to execute. Click Run.</div>}
         </div>
       </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] w-full rounded-xl overflow-hidden shadow-2xl border border-glass-border">
      <SplitLayout leftPane={leftPane} rightPane={rightPane} direction="horizontal" sizes={[45, 55]} />
    </div>
  );
};

export default DSAWorkspace;
