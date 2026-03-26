import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search } from 'lucide-react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TreeVisualizer = () => {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 50,
    left: { value: 30, left: { value: 20, left: null, right: null }, right: { value: 40, left: null, right: null } },
    right: { value: 70, left: { value: 60, left: null, right: null }, right: { value: 80, left: null, right: null } }
  });
  const [inputValue, setInputValue] = useState('');
  const [traversingValue, setTraversingValue] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const insertNodeWithAnim = async (node: TreeNode | null, val: number): Promise<TreeNode> => {
    if (!node) return { value: val, left: null, right: null };
    
    setTraversingValue(node.value);
    await sleep(600);

    if (val < node.value) {
      node.left = await insertNodeWithAnim(node.left, val);
    } else if (val > node.value) {
      node.right = await insertNodeWithAnim(node.right, val);
    }
    return { ...node };
  };

  const handleInsert = async () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    const newRoot = await insertNodeWithAnim(root, val);
    setRoot(newRoot);
    setTraversingValue(null);
    setInputValue('');
  };

  const [traversedNodes, setTraversedNodes] = useState<number[]>([]);

  const preorder = async (node: TreeNode | null) => {
    if (!node) return;
    setTraversingValue(node.value);
    setTraversedNodes(prev => [...prev, node.value]);
    await sleep(600);
    await preorder(node.left);
    await preorder(node.right);
  };

  const inorder = async (node: TreeNode | null) => {
    if (!node) return;
    await inorder(node.left);
    setTraversingValue(node.value);
    setTraversedNodes(prev => [...prev, node.value]);
    await sleep(600);
    await inorder(node.right);
  };

  const postorder = async (node: TreeNode | null) => {
    if (!node) return;
    await postorder(node.left);
    await postorder(node.right);
    setTraversingValue(node.value);
    setTraversedNodes(prev => [...prev, node.value]);
    await sleep(600);
  };

  const handleTraversal = async (type: 'pre' | 'in' | 'post') => {
    setTraversedNodes([]);
    if (type === 'pre') await preorder(root);
    else if (type === 'in') await inorder(root);
    else if (type === 'post') await postorder(root);
    setTraversingValue(null);
  };

  const RenderNode = ({ node, x, y, level }: { node: TreeNode | null, x: number, y: number, level: number }) => {
    if (!node) return null;
    const offset = 200 / Math.pow(1.6, level);

    return (
      <g>
        <AnimatePresence>
          {node.left && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={x} y1={y} x2={x - offset} y2={y + 80}
              stroke="var(--accent-primary)"
              strokeOpacity="0.4"
              strokeWidth="2"
            />
          )}
          {node.right && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={x} y1={y} x2={x + offset} y2={y + 80}
              stroke="var(--accent-primary)"
              strokeOpacity="0.4"
              strokeWidth="2"
            />
          )}
        </AnimatePresence>
        
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <circle 
            cx={x} cy={y} r="20" 
            fill={node.value === traversingValue ? 'var(--accent-primary)' : 'var(--bg-secondary)'} 
            stroke="var(--accent-primary)" 
            strokeWidth="2" 
            className={node.value === traversingValue ? 'shadow-neon-glow' : ''} 
          />
          <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{node.value}</text>
        </motion.g>

        <RenderNode node={node.left} x={x - offset} y={y + 80} level={level + 1} />
        <RenderNode node={node.right} x={x + offset} y={y + 80} level={level + 1} />
      </g>
    );
  };

  return (
    <div className="tree-visualizer glass-card p-6 overflow-hidden">
      <div className="controls flex items-center gap-4 mb-8">
        <input 
          type="number" 
          placeholder="Value" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="glass-card bg-transparent px-4 py-2 text-white outline-none focus:border-accent-primary border border-glass-border"
        />
        <button className="nav-item active" onClick={handleInsert}>
          <Plus size={18} /> Insert BST
        </button>
        <div className="h-8 w-[1px] bg-glass-border mx-2" />
        <button className="nav-item active text-xs" onClick={() => handleTraversal('pre')}>Preorder</button>
        <button className="nav-item active text-xs" onClick={() => handleTraversal('in')}>Inorder</button>
        <button className="nav-item active text-xs" onClick={() => handleTraversal('post')}>Postorder</button>
        <button className="nav-item active text-xs border-red-500/50 hover:bg-red-500/20" onClick={() => { setTraversedNodes([]); setTraversingValue(null); }}>
          <Trash2 size={14} /> Clear
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-text-secondary">Zoom</span>
          <input type="range" min="0.5" max="1.5" step="0.1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
        </div>
      </div>

      {traversedNodes.length > 0 && (
        <div className="mb-4 p-3 glass-card bg-black/40 border border-accent-primary/30 rounded-lg animate-fadeIn">
          <span className="text-xs text-text-secondary uppercase font-bold mr-3">Traversal Output:</span>
          <div className="flex gap-2 flex-wrap mt-2">
            {traversedNodes.map((val, idx) => (
              <motion.span 
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-2 py-1 bg-accent-primary/20 border border-accent-primary/40 rounded text-sm font-mono"
              >
                {val}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="visualizer-container flex justify-center items-start min-h-[500px] border border-glass-border rounded-xl bg-black/20 p-4">
        <svg width="100%" height="500" viewBox={`0 0 800 500`} style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}>
          <RenderNode node={root} x={400} y={40} level={0} />
        </svg>
      </div>
    </div>
  );
};

export default TreeVisualizer;
