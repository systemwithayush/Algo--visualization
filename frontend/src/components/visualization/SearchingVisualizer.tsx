import React, { useState, useEffect } from 'react';
import Bar from './Bar';
import { Play, RotateCcw, SearchIcon } from 'lucide-react';

const SearchingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [userInput, setUserInput] = useState('');

  const generateArray = (sorted = false) => {
    let newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
    if (sorted) newArray.sort((a, b) => a - b);
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    setCurrentIndex(null);
    setFoundIndex(null);
    setLow(null);
    setHigh(null);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const handleCustomInput = () => {
    if (isRunning) return;
    const nums = userInput
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n > 0 && n <= 100)
      .slice(0, 25);
    
    if (nums.length > 0) {
      setArray(nums);
      setTarget(nums[Math.floor(Math.random() * nums.length)]);
      setCurrentIndex(null);
      setFoundIndex(null);
      setLow(null);
      setHigh(null);
      setUserInput('');
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const linearSearch = async () => {
    setIsRunning(true);
    setFoundIndex(null);
    for (let i = 0; i < array.length; i++) {
      if (!isRunning) break;
      setCurrentIndex(i);
      await sleep(100 - speed);
      if (array[i] === target) {
        setFoundIndex(i);
        break;
      }
    }
    setIsRunning(false);
  };

  const binarySearch = async () => {
    setIsRunning(true);
    setFoundIndex(null);
    let l = 0, r = array.length - 1;
    setLow(l);
    setHigh(r);

    while (l <= r) {
      if (!isRunning) break;
      let mid = Math.floor((l + r) / 2);
      setCurrentIndex(mid);
      await sleep(100 - speed);

      if (array[mid] === target) {
        setFoundIndex(mid);
        break;
      } else if (array[mid] < target!) {
        l = mid + 1;
        setLow(l);
      } else {
        r = mid - 1;
        setHigh(r);
      }
    }
    setIsRunning(false);
  };

  return (
    <div className="searching-visualizer glass-card p-6">
      <div className="controls flex items-center gap-4 mb-8">
        <button className="nav-item active" onClick={() => generateArray(false)} disabled={isRunning}>
          <RotateCcw size={18} /> New Array
        </button>
        <button className="nav-item active" onClick={() => generateArray(true)} disabled={isRunning}>
          <RotateCcw size={18} /> New Sorted Array
        </button>

        <div className="h-6 w-[1px] bg-glass-border mx-2" />

        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="e.g. 10, 50, 30" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="glass-card bg-transparent px-4 py-2 text-white outline-none border border-glass-border w-40 focus:border-accent-primary text-sm"
            disabled={isRunning}
          />
          <button 
            className="nav-item active" 
            onClick={handleCustomInput}
            disabled={isRunning || !userInput.trim()}
          >
            Set Array
          </button>
        </div>

        <div className="h-6 w-[1px] bg-glass-border mx-2" />
        <div className="target-input flex items-center gap-2 glass-card px-4 py-2">
          <span>Target:</span>
          <span className="text-accent-primary font-bold">{target}</span>
        </div>
        <button className="nav-item active" onClick={linearSearch} disabled={isRunning}>
          <Play size={18} /> Linear
        </button>
        <button className="nav-item active" onClick={binarySearch} disabled={isRunning || !array.every((v, i, a) => !i || a[i-1] <= v)}>
          <Play size={18} /> Binary
        </button>
      </div>

      <div className="visualizer-container flex items-end justify-center gap-1 h-64 border-b border-gray-700">
        {array.map((val, idx) => (
          <Bar 
            key={idx} 
            value={val} 
            width={100 / array.length}
            status={
              foundIndex === idx ? 'sorted' :
              currentIndex === idx ? 'comparing' :
              (low !== null && high !== null && (idx < low || idx > high)) ? 'default' :
              (low !== null && high !== null) ? 'comparing' : 'default'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SearchingVisualizer;
