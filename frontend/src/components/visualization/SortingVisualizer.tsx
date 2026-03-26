import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export function playNote(freq: number, type: OscillatorType = 'sine', duration: number = 0.05, vol: number = 0.05) {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.value = freq;
  
  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const [speed, setSpeed] = useState(50);
  const [logs, setLogs] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] = useState<{ indices: number[], expr: string, result: boolean } | null>(null);
  const [activeRange, setActiveRange] = useState<[number, number] | null>(null);
  const [pivotIdx, setPivotIdx] = useState<number | null>(null);
  const [userInput, setUserInput] = useState('');
  const [pivotStrategy, setPivotStrategy] = useState<'last' | 'first' | 'random'>('last');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const generateArray = useCallback((size: number = arraySize) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setActiveRange(null);
    setPivotIdx(null);
    setIsRunning(false);
    isRunningRef.current = false;
  }, [arraySize]);
  
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const sleep = (ms: number) => {
    if (ms <= 0) return new Promise(resolve => setTimeout(resolve, 0));
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const getDelay = () => {
    // scale delay exponentially based on speed slider
    // speed 1 => slow (~200ms), speed 100 => fast (~0ms)
    return Math.floor(200 * Math.pow(1 - speed / 100, 2));
  };

  const handleSort = async (sortFunc: () => Promise<void>) => {
    if (isRunning) return;
    initAudio();
    setIsRunning(true);
    isRunningRef.current = true;
    await sortFunc();
    setIsRunning(false);
    isRunningRef.current = false;
  };

  const handleCustomInput = () => {
    if (isRunning) return;
    const nums = userInput
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n > 0 && n <= 100)
      .slice(0, 100);
    
    if (nums.length > 0) {
      setArraySize(nums.length);
      setArray(nums);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setActiveRange(null);
      setPivotIdx(null);
      setLogs(prev => [`Custom array set: [${nums.join(', ')}]`].concat(prev).slice(0, 10));
      setUserInput('');
    }
  };

  const addLog = (msg: string) => {
    if (arraySize <= 25) {
      setLogs(prev => [msg].concat(prev).slice(0, 10));
    }
  };

  const finishSweep = async (finalArr: number[]) => {
    // Beautiful green sweep at the end
    for (let i = 0; i < finalArr.length; i++) {
        if (!isRunningRef.current) return;
        setSorted(prev => {
            const next = [...prev];
            if (!next.includes(i)) next.push(i);
            return next;
        });
        if (soundEnabled) {
             const freq = 200 + finalArr[i] * 5;
             playNote(freq, 'sine', 0.05, 0.05);
        }
        await sleep(Math.max(5, 50 - finalArr.length));
    }
  };

  const bubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n; i++) {
      let swappedThisRound = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunningRef.current) return; 
        
        const delay = getDelay();
        if (delay > 0 || j % 10 === 0) await sleep(delay);

        const res = arr[j] > arr[j + 1];
        setComparing([j, j + 1]);
        if (soundEnabled) playNote(200 + arr[j] * 5, 'triangle', 0.03, 0.02);
        
        if (arraySize <= 25) {
            setComparisonResult({ indices: [j, j + 1], expr: `${arr[j]} > ${arr[j+1]}`, result: res });
            addLog(`Check: ${arr[j]} > ${arr[j+1]} ? ${res}`);
        }
        
        if (res) {
          swappedThisRound = true;
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          if (soundEnabled) playNote(200 + arr[j] * 5, 'square', 0.03, 0.02);
          if (delay > 0) await sleep(delay);
        }
        setSwapping([]);
        setComparing([]);
      }
      if (!isRunningRef.current) return;
      if (!swappedThisRound) {
          await finishSweep(arr);
          return;
      }
    }
    await finishSweep(arr);
  };

  const mergeSort = async () => {
    let arr = [...array];
    
    const merge = async (start: number, mid: number, end: number) => {
      let temp = [];
      let i = start, j = mid + 1;
      
      while (i <= mid && j <= end) {
        if (!isRunningRef.current) return;
        const delay = getDelay();
        if (delay > 0 || j % 10 === 0) await sleep(delay);

        const res = arr[i] <= arr[j];
        setComparing([i, j]);
        if (soundEnabled) playNote(200 + arr[i] * 5, 'triangle', 0.03, 0.02);
        
        if (arraySize <= 25) {
            setComparisonResult({ indices: [i, j], expr: `${arr[i]} ≤ ${arr[j]}?`, result: res });
            addLog(`Merge check: ${arr[i]} ≤ ${arr[j]} ? ${res}`);
        }
        
        if (res) {
          temp.push(arr[i++]);
        } else {
          temp.push(arr[j++]);
        }
      }
      
      while (i <= mid) temp.push(arr[i++]);
      while (j <= end) temp.push(arr[j++]);
      
      for (let k = 0; k < temp.length; k++) {
        if (!isRunningRef.current) return;
        const delay = getDelay();
        arr[start + k] = temp[k];
        setArray([...arr]);
        setSwapping([start + k]);
        if (soundEnabled) playNote(200 + temp[k] * 5, 'square', 0.03, 0.02);
        if (delay > 0 || k % 10 === 0) await sleep(delay);
      }
      setSwapping([]);
    };

    const sort = async (start: number, end: number) => {
      if (start >= end || !isRunningRef.current) return;
      
      setActiveRange([start, end]);
      if (arraySize <= 25) addLog(`Dividing: [${start}...${end}]`);
      
      let mid = Math.floor((start + end) / 2);
      await sort(start, mid);
      await sort(mid + 1, end);
      
      setActiveRange([start, end]);
      await merge(start, mid, end);
    };

    await sort(0, arr.length - 1);
    if (!isRunningRef.current) return;
    await finishSweep(arr);
  };

  const quickSort = async () => {
    let arr = [...array];

    const partition = async (low: number, high: number) => {
      let pivotIndexToUse = high;
      if (pivotStrategy === 'first') pivotIndexToUse = low;
      else if (pivotStrategy === 'random') pivotIndexToUse = Math.floor(Math.random() * (high - low + 1)) + low;
      
      const delay = getDelay();
      
      if (pivotIndexToUse !== high) {
        setSwapping([pivotIndexToUse, high]);
        if (arraySize <= 25) addLog(`Strategy (${pivotStrategy}): swapping ${arr[pivotIndexToUse]} and ${arr[high]}`);
        if (delay > 0) await sleep(delay);
        [arr[pivotIndexToUse], arr[high]] = [arr[high], arr[pivotIndexToUse]];
        setArray([...arr]);
        if (soundEnabled) playNote(200 + arr[high] * 5, 'square', 0.03, 0.02);
        setSwapping([]);
        if (delay > 0) await sleep(delay);
      }

      let pivot = arr[high];
      setPivotIdx(high);
      let i = low - 1;
      if (arraySize <= 25) addLog(`Pivot targeted: ${pivot}`);
      
      for (let j = low; j < high; j++) {
        if (!isRunningRef.current) return -1;
        const res = arr[j] < pivot;
        setComparing([j, high]);
        if (soundEnabled) playNote(200 + arr[j] * 5, 'triangle', 0.03, 0.02);
        
        if (arraySize <= 25) {
            setComparisonResult({ indices: [j, high], expr: `${arr[j]} < ${pivot} (pivot)?`, result: res });
            addLog(`Check: ${arr[j]} < ${pivot}? ${res}`);
        }
        
        if (delay > 0 || j % 10 === 0) await sleep(delay);
        
        if (res) {
          i++;
          if (arraySize <= 25) setComparisonResult({ indices: [i, j], expr: `${arr[j]} is < Pivot. Swapping with boundary pos ${i}.`, result: true });
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          setSwapping([i, j]);
          if (soundEnabled) playNote(200 + arr[j] * 5, 'square', 0.03, 0.02);
          if (arraySize <= 25) addLog(`Swapped boundary element ${arr[j]} with ${arr[i]}`);
          if (delay > 0) await sleep(delay);
        }
        setSwapping([]);
      }

      setSwapping([i + 1, high]);
      if (arraySize <= 25) addLog(`Pivot ${pivot} placed at idx ${i+1}`);
      if (delay > 0) await sleep(delay);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      if (soundEnabled) playNote(200 + arr[i+1] * 5, 'square', 0.03, 0.02);
      if (delay > 0) await sleep(delay);
      setSwapping([]);
      setPivotIdx(null);
      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (!isRunningRef.current) return;
      if (low < high) {
        setActiveRange([low, high]);
        if (arraySize <= 25) addLog(`Partitioning Sub-array: [${low}...${high}]`);
        let pi = await partition(low, high);
        if (pi === -1) return;
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };

    await sort(0, arr.length - 1);
    if (!isRunningRef.current) return;
    await finishSweep(arr);
    setActiveRange(null);
  };

  const selectionSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      setPivotIdx(i);
      
      for (let j = i + 1; j < n; j++) {
        if (!isRunningRef.current) return;
        setComparing([j, minIdx]);
        if (soundEnabled) playNote(200 + arr[j] * 5, 'triangle', 0.03, 0.02);
        
        const delay = getDelay();
        if (delay > 0 || j % 10 === 0) await sleep(delay);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          if (arraySize <= 25) addLog(`New minimum found: ${arr[j]} at index ${j}`);
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        if (soundEnabled) playNote(200 + arr[i] * 5, 'square', 0.03, 0.02);
        const delay = getDelay();
        if (delay > 0) await sleep(delay);
        setSwapping([]);
      }
      setSorted(prev => [...prev, i]);
    }
    setPivotIdx(null);
    await finishSweep(arr);
  };

  const insertionSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        setPivotIdx(i);

        if (arraySize <= 25) addLog(`Inserting ${key} into sorted portion`);

        while (j >= 0 && arr[j] > key) {
            if (!isRunningRef.current) return;
            setComparing([j, j + 1]);
            setSwapping([j + 1]);
            
            arr[j + 1] = arr[j];
            setArray([...arr]);
            if (soundEnabled) playNote(200 + arr[j] * 5, 'triangle', 0.03, 0.02);
            
            const delay = getDelay();
            if (delay > 0) await sleep(delay);
            
            j = j - 1;
            setSwapping([]);
        }
        arr[j + 1] = key;
        setArray([...arr]);
        setSwapping([j + 1]);
        if (soundEnabled) playNote(200 + key * 5, 'square', 0.03, 0.02);
        const delay = getDelay();
        if (delay > 0) await sleep(delay);
        setSwapping([]);
    }
    setPivotIdx(null);
    await finishSweep(arr);
  };

  const getMaxVal = () => Math.max(...array, 100);

  return (
    <div className="sorting-visualizer glass-card p-6">
      <div className="controls flex flex-wrap items-center gap-4 mb-4 sticky top-0 z-50 bg-bg-secondary w-full p-2 rounded-lg">
        <button title="Regenerate Array" className="nav-item active flex items-center gap-2" onClick={() => generateArray()} disabled={isRunning}>
          <RotateCcw size={18} /> Regenerate
        </button>
        
        <button className="nav-item active flex items-center gap-2" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <div className="h-6 w-[1px] bg-glass-border mx-2" />

        <div className="flex items-center gap-2">
           <span className="text-xs text-text-secondary">Size: {arraySize}</span>
           <input 
             type="range"
             min="10"
             max="200"
             step="5"
             value={arraySize}
             onChange={(e) => {
                 setArraySize(Number(e.target.value));
                 // Array will regenerate because of useEffect on arraySize
             }}
             disabled={isRunning}
             className="w-24 accent-accent-primary"
           />
        </div>

        <div className="speed-control flex items-center gap-2">
          <span className="text-xs text-text-secondary">Speed: {speed}</span>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 accent-accent-primary"
          />
        </div>

        <div className="h-6 w-[1px] bg-glass-border mx-2" />
        
        <button title="Run Bubble Sort" className="nav-item active flex items-center gap-2" onClick={() => handleSort(bubbleSort)} disabled={isRunning}>
          <Play size={18} /> Bubble
        </button>
        <button title="Run Merge Sort" className="nav-item active flex items-center gap-2" onClick={() => handleSort(mergeSort)} disabled={isRunning}>
          <Play size={18} /> Merge
        </button>
        <button title="Run Quick Sort" className="nav-item active flex items-center gap-2" onClick={() => handleSort(quickSort)} disabled={isRunning}>
          <Play size={18} /> Quick
        </button>
        <button title="Run Selection Sort" className="nav-item active flex items-center gap-2" onClick={() => handleSort(selectionSort)} disabled={isRunning}>
          <Play size={18} /> Selection
        </button>
        <button title="Run Insertion Sort" className="nav-item active flex items-center gap-2" onClick={() => handleSort(insertionSort)} disabled={isRunning}>
          <Play size={18} /> Insertion
        </button>
      </div>
      
      <div className="controls flex flex-wrap items-center gap-4 mb-8 sticky top-16 z-50 bg-bg-secondary w-full p-2 rounded-lg border-t border-glass-border">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Custom e.g. 10, 50, 30" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="glass-card bg-transparent px-3 py-1.5 text-white outline-none border border-glass-border w-48 focus:border-accent-primary text-sm"
              disabled={isRunning}
            />
            <button 
              className="nav-item active flex-shrink-0 text-sm py-1.5 px-3" 
              onClick={handleCustomInput}
              disabled={isRunning || !userInput.trim()}
            >
              Set Array
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select 
              className="glass-card bg-transparent px-3 py-1.5 text-white outline-none border border-glass-border focus:border-accent-primary text-sm"
              value={pivotStrategy}
              onChange={(e) => setPivotStrategy(e.target.value as any)}
              disabled={isRunning}
            >
              <option value="last" className="bg-bg-primary text-white">Pivot: Last</option>
              <option value="first" className="bg-bg-primary text-white">Pivot: First</option>
              <option value="random" className="bg-bg-primary text-white">Pivot: Random</option>
            </select>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 visualizer-container flex items-end justify-center rounded-lg h-[400px] border border-glass-border relative overflow-hidden bg-black/20 p-4">
          
          <AnimatePresence>
            {comparisonResult && arraySize <= 25 && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className={`absolute top-4 px-4 py-2 rounded-full font-mono text-sm shadow-neon-glow border-2 transition-colors z-10 ${comparisonResult.result ? 'border-accent-primary bg-accent-primary/20' : 'border-red-500 bg-red-500/20'}`}
              >
                {comparisonResult.expr} {comparisonResult.expr.includes('TRUE') || comparisonResult.expr.includes('FALSE') ? '' : `→ ${comparisonResult.result ? 'TRUE' : 'FALSE'}`}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full h-full flex items-end justify-center gap-[1px] md:gap-1">
            {array.map((val, idx) => {
              const maxVal = getMaxVal();
              const heightPercent = Math.max((val / maxVal) * 100, 2);
              const isSwapping = swapping.includes(idx);
              const isComparing = comparing.includes(idx);
              const isSorted = sorted.includes(idx);
              const isPivot = pivotIdx === idx;
              const inActiveRange = activeRange && idx >= activeRange[0] && idx <= activeRange[1];
              
              const hue = (val / maxVal) * 300;
              let backgroundColor = `hsl(${hue}, 100%, 50%)`;
              if (isSorted) backgroundColor = '#10b981';
              if (isComparing) backgroundColor = 'yellow';
              if (isSwapping) backgroundColor = 'red';
              if (isPivot) backgroundColor = 'orange';

              return (
                <div 
                  key={`${val}-${idx}-${Math.random()}`}
                  className={`bar-node relative rounded-t-sm transition-all duration-75 ${arraySize > 50 ? 'w-full' : 'w-4 md:w-8'}`}
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor,
                    opacity: (!inActiveRange && activeRange && !isSorted) ? 0.3 : 1,
                    boxShadow: isSwapping || isComparing || isPivot ? `0 0 10px ${backgroundColor}` : 'none',
                  }}
                  title={`Value: ${val}, Index: ${idx}`}
                >
                  {arraySize <= 25 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70">
                      {val}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="glass-card p-4 bg-black/40 overflow-hidden flex flex-col h-[400px]">
          <div className="text-[10px] font-bold text-text-secondary mb-2 uppercase tracking-wider flex justify-between">
            <span>Step Execution Log</span>
            {arraySize > 25 && <span className="text-yellow-500">Disabled for size &gt; 25</span>}
          </div>
          <div className="flex-1 overflow-auto font-mono text-[11px] leading-tight flex flex-col-reverse">
             {logs.length === 0 ? (
                 <div className="text-gray-600">Start algorithm to see logs...</div>
             ) : (
                 logs.map((log, i) => (
                   <div 
                     key={i} 
                     className="mb-1 border-l-2 border-accent-primary pl-2 opacity-80"
                   >
                     {log}
                   </div>
                 ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
