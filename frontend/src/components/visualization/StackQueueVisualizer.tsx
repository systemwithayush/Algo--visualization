import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';

const StackQueueVisualizer = () => {
  const [items, setItems] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [mode, setMode] = useState<'stack' | 'queue'>('stack');
  const [isRunning, setIsRunning] = useState(false);
  const [comparison, setComparison] = useState<string | null>(null);

  const handleCustomStateInput = () => {
    if (isRunning) return;
    const nums = customInput
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n))
      .slice(0, 20);

    if (nums.length > 0) {
      setItems(nums);
      setCustomInput('');
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const push = async () => {
    if (!inputValue || isRunning) return;
    setIsRunning(true);
    const val = parseInt(inputValue);
    setInputValue('');
    
    setComparison(mode === 'stack' ? `Pushing ${val} to the TOP of the Stack (LIFO)` : `Enqueuing ${val} to the REAR of the Queue (FIFO)`);
    await sleep(800);
    
    setItems([...items, val]);
    setComparison(null);
    setIsRunning(false);
  };

  const pop = async () => {
    if (items.length === 0 || isRunning) return;
    setIsRunning(true);
    
    if (mode === 'stack') {
      setComparison(`Popping ${items[items.length - 1]} from the TOP of the Stack (LIFO)`);
      await sleep(800);
      setItems(items.slice(0, -1));
    } else {
      setComparison(`Dequeuing ${items[0]} from the FRONT of the Queue (FIFO)`);
      await sleep(800);
      setItems(items.slice(1));
    }
    
    setComparison(null);
    setIsRunning(false);
  };

  return (
    <div className="stack-queue-visualizer glass-card p-6">
      <div className="controls flex items-center gap-4 mb-8">
        <div className="flex glass-card p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md transition-all ${mode === 'stack' ? 'bg-accent-primary text-white shadow-neon-glow' : 'text-text-secondary'}`}
            onClick={() => setMode('stack')}
          >
            Stack
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all ${mode === 'queue' ? 'bg-accent-primary text-white shadow-neon-glow' : 'text-text-secondary'}`}
            onClick={() => setMode('queue')}
          >
            Queue
          </button>
        </div>

        <div className="h-4 w-[1px] bg-glass-border mx-1" />

        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="e.g. 10, 20, 30" 
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-primary border border-glass-border w-32 text-sm"
            disabled={isRunning}
          />
          <button 
            className="nav-item active flex-shrink-0" 
            onClick={handleCustomStateInput} 
            disabled={isRunning || !customInput.trim()}
          >
            Set Items
          </button>
        </div>

        <div className="h-4 w-[1px] bg-glass-border mx-1" />
        
        <input 
          type="number" 
          placeholder="Value" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-primary border border-glass-border w-24 text-sm"
          disabled={isRunning}
        />
        <button className="nav-item active" onClick={push} disabled={isRunning}>
          <Plus size={18} /> {mode === 'stack' ? 'Push' : 'Enqueue'}
        </button>
        <button className="nav-item active" onClick={pop} disabled={isRunning}>
          <Trash2 size={18} /> {mode === 'stack' ? 'Pop' : 'Dequeue'}
        </button>
      </div>

      <div className={`visualizer-container flex ${mode === 'stack' ? 'flex-col-reverse justify-start items-center' : 'items-center justify-start'} gap-4 min-h-[300px] overflow-auto p-10 relative`}>
        <AnimatePresence>
          {comparison && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`absolute px-4 py-2 rounded border text-sm font-mono whitespace-nowrap z-10
                ${mode === 'stack' ? 'top-4 right-4 bg-accent-primary/20 border-accent-primary' : 'top-4 left-4 bg-accent-secondary/20 border-accent-secondary'}`}
            >
              {comparison}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {items.map((val, idx) => (
            <motion.div
              key={`${idx}-${val}`}
              layout
              initial={{ scale: 0, opacity: 0, y: mode === 'stack' ? -50 : 0, x: mode === 'queue' ? -50 : 0 }}
              animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
              exit={{ scale: 0, opacity: 0, y: mode === 'stack' ? 50 : 0, x: mode === 'queue' ? 50 : 0 }}
              className="glass-card p-6 min-w-[100px] text-center border-2 border-accent-secondary font-bold text-xl relative"
            >
              {val}
              {mode === 'stack' && idx === items.length - 1 && (
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-accent-primary flex items-center gap-1">
                   <ArrowDown size={20} /> TOP
                </div>
              )}
              {mode === 'queue' && idx === 0 && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-accent-primary flex flex-col items-center">
                   FRONT <ArrowDown size={20} />
                </div>
              )}
              {mode === 'queue' && idx === items.length - 1 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-accent-secondary flex flex-col items-center">
                   <ArrowUp size={20} /> REAR
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StackQueueVisualizer;
