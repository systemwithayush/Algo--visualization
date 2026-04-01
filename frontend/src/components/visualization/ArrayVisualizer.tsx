import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Plus, Grid, ListEnd, ArrowDownUp, FastForward, Play, Pause, AlertCircle, RotateCcw } from 'lucide-react';
import CodeLogicPanel from './CodeLogicPanel';

const linearSearchCode = [
  "function linearSearch(arr, target) {",
  "  for (let i = 0; i < arr.length; i++) {",
  "    if (arr[i] === target) {",
  "      return i;",
  "    }",
  "  }",
  "  return -1;",
  "}"
];

const binarySearchCode = [
  "function binarySearch(arr, target) {",
  "  let l = 0, r = arr.length - 1;",
  "  while (l <= r) {",
  "    let m = Math.floor((l + r) / 2);",
  "    if (arr[m] === target) return m;",
  "    if (arr[m] < target) l = m + 1;",
  "    else r = m - 1;",
  "  }",
  "  return -1;",
  "}"
];

const bubbleSortCode = [
  "function bubbleSort(arr) {",
  "  let n = arr.length;",
  "  let swapped;",
  "  do {",
  "    swapped = false;",
  "    for (let i = 0; i < n - 1; i++) {",
  "      if (arr[i] > arr[i + 1]) {",
  "        swap(arr, i, i + 1);",
  "        swapped = true;",
  "      }",
  "    }",
  "    n--;",
  "  } while (swapped);",
  "  return arr;",
  "}"
];

const selectionSortCode = [
  "function selectionSort(arr) {",
  "  for (let i = 0; i < arr.length - 1; i++) {",
  "    let minIdx = i;",
  "    for (let j = i + 1; j < arr.length; j++) {",
  "      if (arr[j] < arr[minIdx]) minIdx = j;",
  "    }",
  "    swap(arr, i, minIdx);",
  "  }",
  "  return arr;",
  "}"
];

const insertionSortCode = [
  "function insertionSort(arr) {",
  "  for (let i = 1; i < arr.length; i++) {",
  "    let key = arr[i];",
  "    let j = i - 1;",
  "    while (j >= 0 && arr[j] > key) {",
  "      arr[j + 1] = arr[j];",
  "      j--;",
  "    }",
  "    arr[j + 1] = key;",
  "  }",
  "  return arr;",
  "}"
];

const ArrayVisualizer = () => {
  const [array, setArray] = useState<number[]>([45, 12, 67, 23, 89, 34, 56]);
  const [searchValue, setSearchValue] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [compareIdx, setCompareIdx] = useState<number | null>(null);
  const [foundPos, setFoundPos] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [comparison, setComparison] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(600);
  
  const [activeCode, setActiveCode] = useState<string[]>(linearSearchCode);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- SEARCH ALGORITHMS ---

  const searchLinear = async () => {
    if (!searchValue || isSearching) return;
    setIsSearching(true);
    setFoundPos(null);
    setActiveCode(linearSearchCode);
    
    const target = parseInt(searchValue);
    setActiveLine(0);
    setComparison(`initialize linearSearch for target=${target}`);
    await sleep(speed);

    for (let i = 0; i < array.length; i++) {
      setActiveIdx(i);
      setActiveLine(1);
      setComparison(`Loop step: i=${i}`);
      await sleep(speed);
      
      setActiveLine(2);
      const isMatch = array[i] === target;
      setComparison(`Is arr[${i}] (${array[i]}) === ${target}?`);
      await sleep(speed);
      
      if (isMatch) {
         setActiveLine(3);
         setFoundPos(i);
         setComparison(`Match found! Return index ${i}`);
         await sleep(speed);
         break;
      }
    }
    
    if (foundPos === null && isSearching) {
       setActiveLine(6);
       setComparison(`Target not found in array. Return -1`);
       await sleep(speed);
    }
    
    setActiveIdx(null);
    setIsSearching(false);
    setActiveLine(null);
  };

  const searchBinary = async () => {
    if (!searchValue || isSearching) return;
    
    // Binary Search requires sorted array!
    const sorted = [...array].sort((a,b)=>a-b);
    let isSorted = true;
    for(let i=0; i<array.length; i++) if(array[i] !== sorted[i]) isSorted = false;
    
    if(!isSorted) {
      alert("Binary Search requires the array to be Sorted first! Please Sort it.");
      return;
    }

    setIsSearching(true);
    setFoundPos(null);
    setActiveCode(binarySearchCode);
    const target = parseInt(searchValue);
    
    setActiveLine(0);
    setComparison(`initialize binarySearch for target=${target}`);
    await sleep(speed);

    let l = 0;
    let r = array.length - 1;
    setActiveLine(1);
    setComparison(`l=${l}, r=${r}`);
    await sleep(speed);

    while (l <= r) {
      setActiveLine(2);
      setComparison(`while l(${l}) <= r(${r})`);
      await sleep(speed);

      let m = Math.floor((l + r) / 2);
      setActiveIdx(m);
      setActiveLine(3);
      setComparison(`m = floor((${l} + ${r}) / 2) = ${m}. arr[${m}] = ${array[m]}`);
      await sleep(speed);

      setActiveLine(4);
      setComparison(`Is arr[m] (${array[m]}) === ${target}?`);
      await sleep(speed);

      if (array[m] === target) {
        setFoundPos(m);
        setActiveLine(4);
        setComparison(`Match found! Return index ${m}`);
        await sleep(speed);
        break;
      }

      setActiveLine(5);
      setComparison(`Is arr[m] < target ?`);
      await sleep(speed);

      if (array[m] < target) {
        l = m + 1;
        setActiveLine(5);
        setComparison(`Yes, l = ${m} + 1 = ${l}`);
      } else {
        r = m - 1;
        setActiveLine(6);
        setComparison(`No, r = ${m} - 1 = ${r}`);
      }
      await sleep(speed);
    }

    if (l > r) {
       setActiveLine(8);
       setComparison(`l > r. Target not found. Return -1`);
       await sleep(speed);
    }

    setActiveIdx(null);
    setIsSearching(false);
    setActiveLine(null);
  };


  // --- SORTING ALGORITHMS ---

  const sortBubble = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundPos(null);
    setActiveCode(bubbleSortCode);
    
    let arr = [...array];
    let n = arr.length;
    let swapped;
    
    setActiveLine(0);
    setComparison("initialize bubbleSort");
    await sleep(speed);
    
    do {
      setActiveLine(3);
      setComparison("Start do-while loop");
      await sleep(speed);

      swapped = false;
      setActiveLine(4);
      setComparison("Set swapped = false");
      await sleep(speed);

      for (let i = 0; i < n - 1; i++) {
        setActiveIdx(i);
        setCompareIdx(i+1);
        setActiveLine(5);
        setComparison(`Loop i=${i} (up to ${n-2})`);
        await sleep(speed);
        
        setActiveLine(6);
        setComparison(`Is arr[${i}] (${arr[i]}) > arr[${i+1}] (${arr[i+1]})?`);
        await sleep(speed);
        
        if (arr[i] > arr[i + 1]) {
          setActiveLine(7);
          setComparison(`Yes. Swapping elements!`);
          await sleep(speed);
          
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setArray([...arr]);
          
          setActiveLine(8);
          swapped = true;
          setComparison(`Set swapped = true`);
          await sleep(speed);
        }
      }
      n--;
      setActiveLine(10);
      setComparison(`Decrement n to ${n}`);
      await sleep(speed);

      setActiveLine(11);
      setComparison(`while swapped (${swapped}) is true`);
      await sleep(speed);
    } while (swapped);
    
    setActiveLine(12);
    setComparison("Array is fully sorted!");
    await sleep(speed);
    
    setActiveIdx(null);
    setCompareIdx(null);
    setIsSearching(false);
    setActiveLine(null);
  };

  const sortSelection = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundPos(null);
    setActiveCode(selectionSortCode);
    
    let arr = [...array];
    
    setActiveLine(0);
    setComparison("initialize selectionSort");
    await sleep(speed);

    for (let i = 0; i < arr.length - 1; i++) {
       setActiveLine(1);
       setComparison(`Outer loop i=${i}`);
       await sleep(speed);

       let minIdx = i;
       setActiveLine(2);
       setComparison(`Set minIdx = ${i} (${arr[i]})`);
       await sleep(speed);

       for (let j = i + 1; j < arr.length; j++) {
         setActiveIdx(minIdx);
         setCompareIdx(j);
         
         setActiveLine(3);
         setComparison(`Inner loop j=${j}`);
         await sleep(speed);

         setActiveLine(4);
         setComparison(`Is arr[${j}] < arr[${minIdx}] ? (${arr[j]} < ${arr[minIdx]})`);
         await sleep(speed);

         if (arr[j] < arr[minIdx]) {
           minIdx = j;
           setActiveLine(4);
           setComparison(`Yes! New minIdx = ${j}`);
           await sleep(speed);
         }
       }
       
       setActiveLine(6);
       setComparison(`Swapping arr[${i}] with arr[${minIdx}]`);
       await sleep(speed);
       let temp = arr[i];
       arr[i] = arr[minIdx];
       arr[minIdx] = temp;
       setArray([...arr]);
    }

    setActiveLine(8);
    setComparison("Array is fully sorted!");
    await sleep(speed);
    
    setActiveIdx(null);
    setCompareIdx(null);
    setIsSearching(false);
    setActiveLine(null);
  };


  const sortInsertion = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundPos(null);
    setActiveCode(insertionSortCode);
    
    let arr = [...array];
    
    setActiveLine(0);
    setComparison("initialize insertionSort");
    await sleep(speed);

    for (let i = 1; i < arr.length; i++) {
       setActiveLine(1);
       setComparison(`Loop i=${i}`);
       await sleep(speed);

       let key = arr[i];
       setActiveLine(2);
       setComparison(`key = arr[${i}] = ${key}`);
       await sleep(speed);

       let j = i - 1;
       setActiveLine(3);
       setComparison(`j = ${j}`);
       await sleep(speed);

       while (j >= 0 && arr[j] > key) {
         setActiveIdx(i);
         setCompareIdx(j);
         setActiveLine(4);
         setComparison(`while j(${j})>=0 && arr[j](${arr[j]}) > key(${key})`);
         await sleep(speed);

         arr[j + 1] = arr[j];
         setArray([...arr]);
         setActiveLine(5);
         setComparison(`arr[${j+1}] = arr[${j}] (${arr[j]})`);
         await sleep(speed);

         j--;
         setActiveLine(6);
         setComparison(`j-- (j is now ${j})`);
         await sleep(speed);
       }
       setActiveLine(4);
       setComparison(`while loop terminated.`);
       await sleep(speed);

       arr[j + 1] = key;
       setArray([...arr]);
       setActiveLine(8);
       setComparison(`arr[${j+1}] = key (${key})`);
       await sleep(speed);
    }

    setActiveLine(10);
    setComparison("Array is fully sorted!");
    await sleep(speed);
    
    setActiveIdx(null);
    setCompareIdx(null);
    setIsSearching(false);
    setActiveLine(null);
  };


  const resetArray = () => {
    if(isSearching) return;
    setArray([...array].sort(() => Math.random() - 0.5));
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-border overflow-hidden">
        
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="number" 
            placeholder="Search Target..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-background border border-border rounded-lg outline-none px-3 py-2 text-sm focus:border-accent-primary w-32"
            disabled={isSearching}
          />
          <button className="bg-accent-primary hover:bg-opacity-90 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-all" onClick={searchLinear} disabled={isSearching || !searchValue}>
            <Search size={14} /> Linear
          </button>
          <button className="bg-accent-primary hover:bg-opacity-90 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-all" onClick={searchBinary} disabled={isSearching || !searchValue}>
            <Search size={14} /> Binary
          </button>
        </div>

        <div className="h-px xl:h-6 w-full xl:w-px bg-border my-2 xl:my-0" />

        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-secondary mr-2">Sorts:</span>
            <button className="bg-text-secondary hover:opacity-90 text-background rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-all" onClick={sortBubble} disabled={isSearching}>
            <ArrowDownUp size={14} /> Bubble
            </button>
            <button className="bg-text-secondary hover:opacity-90 text-background rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-all" onClick={sortSelection} disabled={isSearching}>
            <ArrowDownUp size={14} /> Selection
            </button>
            <button className="bg-text-secondary hover:opacity-90 text-background rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-all" onClick={sortInsertion} disabled={isSearching}>
            <ArrowDownUp size={14} /> Insertion
            </button>
        </div>

        <div className="h-px xl:h-6 w-full xl:w-px bg-border my-2 xl:my-0 xl:ml-auto" />
        
        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1 text-sm justify-between">
          <span className="px-2 text-secondary font-medium hidden sm:block"><FastForward size={14} className="inline mr-1" /> Speed:</span>
          <button 
            className={`px-2 py-1 rounded transition-colors ${speed === 1500 ? 'text-blue-500 font-bold bg-primary/10' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5'}`} 
            onClick={() => setSpeed(1500)}
            disabled={isSearching}
          >Slow</button>
          <button 
            className={`px-2 py-1 rounded transition-colors ${speed === 600 ? 'text-green-500 font-bold bg-primary/10' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5'}`} 
            onClick={() => setSpeed(600)}
            disabled={isSearching}
          >Norm</button>
          <button 
            className={`px-2 py-1 rounded transition-colors ${speed === 200 ? 'text-red-500 font-bold bg-primary/10' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5'}`} 
            onClick={() => setSpeed(200)}
            disabled={isSearching}
          >Fast</button>
        </div>

        <button onClick={resetArray} disabled={isSearching} className="p-2 border border-border rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 mt-2 xl:mt-0 title='Shuffle Array'">
           <RotateCcw size={16} className="text-secondary" />
        </button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Visualization Canvas */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-black/5 dark:bg-white/5 rounded-2xl min-h-[400px] border border-border relative overflow-hidden">
            <div className="flex gap-2 sm:gap-4 items-center flex-wrap justify-center w-full min-w-[300px]">
              {array.map((val, idx) => (
                <motion.div 
                  key={`${idx}-${val}`}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border-2 shadow-sm font-bold text-sm sm:text-lg
                    ${activeIdx === idx || compareIdx === idx ? 'border-accent-primary bg-accent-primary/20 text-accent-primary scale-110 z-10' : 
                      foundPos === idx ? 'border-green-500 bg-green-500/20 text-green-500 scale-110 z-10 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 
                      'border-border bg-card text-text-primary scale-100 z-0'}`}
                >
                  {val}
                  <span className="absolute -bottom-6 text-[10px] sm:text-xs text-secondary font-mono">
                    [{idx}]
                  </span>
                </motion.div>
              ))}
            </div>
            {isSearching && (
               <div className="absolute bottom-6 font-mono text-xs sm:text-sm tracking-widest text-accent-secondary animate-pulse uppercase text-center w-full">
                 EXECUTION IN PROGRESS
               </div>
            )}
        </div>

        {/* Code + Logic Explanation Mode Panel */}
        <div className="w-full">
           <CodeLogicPanel 
              language="javascript"
              codeLines={activeCode}
              activeLine={activeLine}
              explanation={comparison}
           />
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
