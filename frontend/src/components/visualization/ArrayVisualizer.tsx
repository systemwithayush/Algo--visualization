import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Plus, Grid, ListEnd, ArrowDownUp } from 'lucide-react';

const ArrayVisualizer = () => {
  const [array, setArray] = useState<number[]>([12, 45, 67, 23, 89, 34, 56]);
  const [matrix, setMatrix] = useState<number[][]>([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ]);
  const [type, setType] = useState<'1D' | '2D'>('1D');
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchIndex, setSearchIndex] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeCell, setActiveCell] = useState<{ r: number, c: number } | null>(null);
  const [foundPos, setFoundPos] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [comparison, setComparison] = useState<string | null>(null);

  const handleCustomArrayInput = () => {
    if (isSearching) return;
    const nums = customArrayInput
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n))
      .slice(0, 15);
    
    if (nums.length > 0) {
      setArray(nums);
      setCustomArrayInput('');
      setFoundPos(null);
      setActiveIdx(null);
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const search1D = async () => {
    if (!searchValue) return;
    setIsSearching(true);
    setFoundPos(null);
    const target = parseInt(searchValue);
    
    for (let i = 0; i < array.length; i++) {
      setActiveIdx(i);
      const isMatch = array[i] === target;
      setComparison(`array[${i}] == ${target} ? ${isMatch ? 'TRUE' : 'FALSE'}`);
      await sleep(600);
      if (isMatch) {
        setFoundPos(i);
        break;
      }
    }
    setActiveIdx(null);
    setComparison(null);
    setIsSearching(false);
  };

  const accessByIndex = async () => {
    if (searchIndex === '') return;
    const idx = parseInt(searchIndex);
    if (idx < 0 || idx >= array.length) return;
    
    setIsSearching(true);
    setActiveIdx(idx);
    setComparison(`Accessing index ${idx}...`);
    await sleep(1000);
    setActiveIdx(null);
    setComparison(null);
    setIsSearching(false);
  };

  const traverse1D = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundPos(null);

    for (let i = 0; i < array.length; i++) {
      setActiveIdx(i);
      setComparison(`Traversing index ${i}: value is ${array[i]}`);
      await sleep(600);
    }

    setActiveIdx(null);
    setComparison("Traversal complete!");
    await sleep(1000);
    setComparison(null);
    setIsSearching(false);
  };

  const sort1D = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundPos(null);
    
    let arr = [...array];
    let n = arr.length;
    let swapped;
    
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        setActiveIdx(i);
        setComparison(`Comparing indices ${i} and ${i+1}: ${arr[i]} > ${arr[i+1]}?`);
        await sleep(600);
        
        if (arr[i] > arr[i + 1]) {
          setComparison(`Yes, ${arr[i]} > ${arr[i+1]}. Swapping elements...`);
          await sleep(600);
          
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setArray([...arr]);
          swapped = true;
          await sleep(600);
        }
      }
      n--;
    } while (swapped);
    
    setActiveIdx(null);
    setComparison("Array is sorted!");
    await sleep(1000);
    setComparison(null);
    setIsSearching(false);
  };

  return (
    <div className="array-visualizer space-y-8">
      <div className="controls flex flex-wrap items-center gap-4 glass-card p-4">
        <button 
          className={`nav-item ${type === '1D' ? 'active' : ''}`} 
          onClick={() => setType('1D')}
        >
          <Hash size={18} /> 1D Array
        </button>
        <button 
          className={`nav-item ${type === '2D' ? 'active' : ''}`} 
          onClick={() => setType('2D')}
        >
          <Grid size={18} /> 2D Matrix
        </button>
        
        <div className="h-6 w-[1px] bg-glass-border mx-2" />

        {type === '1D' && (
          <>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="e.g. 10, 20, 30" 
                value={customArrayInput}
                onChange={(e) => setCustomArrayInput(e.target.value)}
                className="glass-card bg-transparent px-4 py-2 text-white outline-none border border-glass-border w-32 focus:border-accent-primary text-sm"
                disabled={isSearching}
              />
              <button 
                className="nav-item active flex-shrink-0" 
                onClick={handleCustomArrayInput} 
                disabled={isSearching || !customArrayInput.trim()}
              >
                Set Array
              </button>
            </div>

            <div className="h-6 w-[1px] bg-glass-border mx-2" />
          </>
        )}

        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Value to Search" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none border border-glass-border w-32 focus:border-accent-primary"
          />
          <button className="nav-item active" onClick={search1D} disabled={isSearching}>
            <Search size={18} /> Search
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Index" 
            value={searchIndex}
            onChange={(e) => setSearchIndex(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none border border-glass-border w-24 focus:border-accent-secondary"
            disabled={isSearching}
          />
          <button className="nav-item active" onClick={accessByIndex} disabled={isSearching}>
            <Plus size={18} /> Access
          </button>
        </div>

        {type === '1D' && (
          <>
            <div className="h-6 w-[1px] bg-glass-border mx-2" />
            <div className="flex items-center gap-2">
              <button className="nav-item active" onClick={traverse1D} disabled={isSearching}>
                <ListEnd size={18} /> Traverse
              </button>
              <button className="nav-item active" onClick={sort1D} disabled={isSearching}>
                <ArrowDownUp size={18} /> Sort
              </button>
            </div>
          </>
        )}
      </div>

      <div className="visualization-area relative glass-card p-10 flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence>
          {comparison && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 px-6 py-2 rounded-full font-mono font-bold bg-accent-primary/20 border border-accent-primary shadow-neon-glow z-20 text-white"
            >
              {comparison}
            </motion.div>
          )}
        </AnimatePresence>

        {type === '1D' ? (
          <div className="flex gap-2 items-center flex-wrap justify-center">
            {array.map((val, idx) => (
              <motion.div 
                key={`${idx}-${val}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  scale: activeIdx === idx ? 1.1 : 1,
                  y: activeIdx === idx ? -10 : 0,
                  opacity: 1
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`relative w-16 h-16 glass-card flex items-center justify-center border-2 transition-colors duration-300
                  ${activeIdx === idx ? 'border-accent-primary shadow-neon-glow' : 
                    foundPos === idx ? 'border-green-500 bg-green-500/10 shadow-neon-glow' : 'border-glass-border'}`}
              >
                <span className={`font-bold transition-colors ${activeIdx === idx ? 'text-white' : foundPos === idx ? 'text-green-400' : 'text-text-secondary'}`}>
                  {val}
                </span>
                <span className="absolute -bottom-6 text-[10px] text-text-secondary font-mono">
                  [{idx}]
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)` }}>
            {matrix.map((row, r) => (
              row.map((val, c) => (
                <motion.div 
                  key={`${r}-${c}`}
                  className="w-16 h-16 glass-card flex items-center justify-center border border-glass-border relative"
                >
                  <span className="font-bold text-text-secondary">{val}</span>
                  <span className="absolute -bottom-4 right-0 text-[8px] text-text-secondary/50 font-mono">
                    {r},{c}
                  </span>
                </motion.div>
              ))
            ))}
          </div>
        )}
      </div>

      <div className="glass-card p-6 border-l-4 border-accent-primary">
        <h3 className="mb-4 flex items-center gap-2">
          <Hash size={18} className="text-accent-primary" />
          Array Mechanism
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Arrays store elements in contiguous memory locations. Accessing an element by index is <span className="text-accent-primary font-bold">O(1)</span> because the memory address is calculated as: 
          <code className="block bg-black/40 p-2 mt-2 rounded border border-glass-border text-xs">
            Address = BaseAddress + (Index * ElementSize)
          </code>
          Searching is <span className="text-accent-secondary font-bold">O(n)</span> as it requires linear traversal.
        </p>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
