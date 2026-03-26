import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowRight, Search, ListEnd, ArrowDownUp } from 'lucide-react';

interface NodeProps {
  value: number;
  highlight?: boolean;
}

const Node: React.FC<NodeProps> = ({ value, highlight }) => (
  <motion.div
    layout
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className={`flex items-center gap-2`}
  >
    <div className={`glass-card p-4 flex items-center justify-center min-w-[60px] min-h-[60px] border-2 ${highlight ? 'border-accent-primary shadow-neon-glow' : 'border-glass-border'}`}>
      <span className="font-bold">{value}</span>
    </div>
    <ArrowRight className="text-text-secondary" size={20} />
  </motion.div>
);

const LinkedListVisualizer = () => {
  const [list, setList] = useState<number[]>([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState('');
  const [customListInput, setCustomListInput] = useState('');
  const [traversingIdx, setTraversingIdx] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [comparison, setComparison] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCustomListInput = () => {
    if (isRunning) return;
    const nums = customListInput
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n))
      .slice(0, 15); // Limit size for linked list to avoid overflow

    if (nums.length > 0) {
      setList(nums);
      setTraversingIdx(null);
      setComparison(null);
      setCustomListInput('');
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const insertAtEnd = async () => {
    if (!inputValue || isRunning) return;
    setIsRunning(true);
    const val = parseInt(inputValue);
    
    // Simulate traversal
    for (let i = 0; i < list.length; i++) {
      setTraversingIdx(i);
      setComparison(`Traversing past node ${i}... following next pointer.`);
      await sleep(400);
    }
    setTraversingIdx(list.length);
    setComparison(`Reached end (NULL). Creating new Node(${val})...`);
    await sleep(600);
    setComparison(`Setting previous tail node's next pointer to Node(${val}).`);
    await sleep(600);
    
    setList([...list, val]);
    setTraversingIdx(null);
    setComparison(null);
    setInputValue('');
    setIsRunning(false);
  };

  const deleteFirst = async () => {
    if (list.length === 0 || isRunning) return;
    setIsRunning(true);
    setTraversingIdx(0);
    setComparison("Identifying Head node...");
    await sleep(600);
    setComparison("Reassigning Head pointer to next node...");
    await sleep(600);
    setList(list.slice(1));
    setTraversingIdx(null);
    setComparison(null);
    setIsRunning(false);
  };

  const searchNode = async () => {
    if (!searchValue || isRunning) return;
    setIsRunning(true);
    const target = parseInt(searchValue);
    
    for (let i = 0; i < list.length; i++) {
      setTraversingIdx(i);
      const isMatch = list[i] === target;
      setComparison(`Checking Node ${i}: value ${list[i]} == ${target}? ${isMatch ? 'MATCH FOUND!' : 'Not a match. Following next pointer...'}`);
      await sleep(800);
      if (isMatch) break;
    }
    
    await sleep(1000); // Highlight result
    setTraversingIdx(null);
    setComparison(null);
    setIsRunning(false);
  };

  const traverseNodes = async () => {
    if (isRunning) return;
    setIsRunning(true);
    
    for (let i = 0; i < list.length; i++) {
      setTraversingIdx(i);
      setComparison(`Visiting Node ${i}. Value: ${list[i]}`);
      await sleep(600);
      if (i < list.length - 1) {
        setComparison(`Moving to next node...`);
        await sleep(400);
      }
    }
    
    setTraversingIdx(list.length);
    setComparison(`Reached end of list (NULL).`);
    await sleep(800);
    
    setTraversingIdx(null);
    setComparison("Traversal complete!");
    await sleep(1000);
    setComparison(null);
    setIsRunning(false);
  };

  const sortNodes = async () => {
    if (list.length < 2 || isRunning) return;
    setIsRunning(true);
    let arr = [...list];
    let n = arr.length;
    let swapped;
    
    setComparison("Sorting Linked List by swapping node values...");
    await sleep(800);
    
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        setTraversingIdx(i);
        setComparison(`Comparing Node ${i} (${arr[i]}) with Node ${i+1} (${arr[i+1]})`);
        await sleep(800);
        
        if (arr[i] > arr[i + 1]) {
          setComparison(`${arr[i]} > ${arr[i+1]}. Swapping values...`);
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setList([...arr]);
          swapped = true;
          await sleep(800);
        } else {
          setComparison(`No swap needed. Continuing...`);
          await sleep(400);
        }
      }
      n--;
    } while (swapped);
    
    setTraversingIdx(null);
    setComparison("Linked List sorted!");
    await sleep(1000);
    setComparison(null);
    setIsRunning(false);
  };

  return (
    <div className="linked-list-visualizer glass-card p-6">
      <div className="controls flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Value" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-primary border border-glass-border w-24"
          />
          <button className="nav-item active" onClick={insertAtEnd} disabled={isRunning}>
            <Plus size={18} /> Insert
          </button>
        </div>

        <div className="h-4 w-[1px] bg-glass-border mx-1" />

        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="e.g. 10, 20, 30" 
            value={customListInput}
            onChange={(e) => setCustomListInput(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-primary border border-glass-border w-32 text-sm"
            disabled={isRunning}
          />
          <button 
            className="nav-item active flex-shrink-0" 
            onClick={handleCustomListInput} 
            disabled={isRunning || !customListInput.trim()}
          >
            Set List
          </button>
        </div>

        <div className="h-4 w-[1px] bg-glass-border mx-1" />

        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Search" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-secondary border border-glass-border w-24"
          />
          <button className="nav-item active" onClick={searchNode} disabled={isRunning}>
            <Search size={18} /> Search
          </button>
        </div>

        <button className="nav-item active" onClick={deleteFirst} disabled={isRunning}>
          <Trash2 size={18} /> Delete Head
        </button>

        <div className="h-4 w-[1px] bg-glass-border mx-1" />

        <button className="nav-item active" onClick={traverseNodes} disabled={isRunning}>
          <ListEnd size={18} /> Traverse
        </button>

        <button className="nav-item active" onClick={sortNodes} disabled={isRunning}>
          <ArrowDownUp size={18} /> Sort Values
        </button>
      </div>

      <div className="visualizer-container flex items-center gap-2 overflow-x-auto py-10 min-h-[150px] relative">
        <AnimatePresence>
          {comparison && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 rounded bg-accent-secondary/20 border border-accent-secondary text-xs font-mono whitespace-nowrap z-10"
            >
              {comparison}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {list.map((val, idx) => (
            <Node key={`${idx}-${val}`} value={val} highlight={traversingIdx === idx} />
          ))}
          <motion.div className="text-text-secondary font-mono">NULL</motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
