import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Zap, RotateCcw } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
  weight?: number;
}

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 200, y: 250 },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 1 },
  ]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const isTraversingRef = React.useRef(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const resetTraversal = () => {
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setActiveNode(null);
    setIsTraversing(false);
    isTraversingRef.current = false;
  };

  const getNeighbors = (nodeId: number) => {
    const neighbors: number[] = [];
    edges.forEach(edge => {
      if (edge.from === nodeId) neighbors.push(edge.to);
      else if (edge.to === nodeId) neighbors.push(edge.from);
    });
    return neighbors;
  };

  const runBFS = async (startNodeId: number) => {
    if (isTraversing) return;
    resetTraversal();
    setIsTraversing(true);
    isTraversingRef.current = true;

    const queue: number[] = [startNodeId];
    const visited = new Set<number>([startNodeId]);
    setVisitedNodes(new Set(visited));

    while (queue.length > 0 && isTraversingRef.current) {
      const current = queue.shift()!;
      setActiveNode(current);
      await sleep(600);

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        if (!isTraversingRef.current) break;
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          const edgeId = [current, neighbor].sort().join('-');
          setVisitedEdges(prev => new Set(prev).add(edgeId));
          setVisitedNodes(new Set(visited));
          queue.push(neighbor);
          await sleep(400);
        }
      }
    }
    setActiveNode(null);
    setIsTraversing(false);
    isTraversingRef.current = false;
  };

  const runDFS = async (startNodeId: number) => {
    if (isTraversing) return;
    resetTraversal();
    setIsTraversing(true);
    isTraversingRef.current = true;

    const visited = new Set<number>();
    
    const dfsVisit = async (nodeId: number) => {
      if (!isTraversingRef.current) return;
      visited.add(nodeId);
      setVisitedNodes(new Set(visited));
      setActiveNode(nodeId);
      await sleep(800);

      const neighbors = getNeighbors(nodeId);
      for (const neighbor of neighbors) {
        if (!isTraversingRef.current) return;
        if (!visited.has(neighbor)) {
          const edgeId = [nodeId, neighbor].sort().join('-');
          setVisitedEdges(prev => new Set(prev).add(edgeId));
          await dfsVisit(neighbor);
          setActiveNode(nodeId); // Backtrack
          await sleep(400);
        }
      }
    };

    await dfsVisit(startNodeId);
    setActiveNode(null);
    setIsTraversing(false);
    isTraversingRef.current = false;
  };

  const [dijkstraNodes, setDijkstraNodes] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });

  const runDijkstra = async (startId: number, endId: number) => {
    if (isTraversing) return;
    resetTraversal();
    setIsTraversing(true);
    isTraversingRef.current = true;

    const distances: Record<number, number> = {};
    const parents: Record<number, number | null> = {};
    const pq: number[] = [startId];
    
    nodes.forEach(n => {
      distances[n.id] = Infinity;
      parents[n.id] = null;
    });
    distances[startId] = 0;

    while (pq.length > 0 && isTraversingRef.current) {
      pq.sort((a, b) => distances[a] - distances[b]);
      const current = pq.shift()!;
      
      setActiveNode(current);
      setVisitedNodes(prev => new Set(prev).add(current));
      await sleep(600);

      if (current === endId) break;

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        if (!isTraversingRef.current) break;
        
        const fromNode = nodes.find(n => n.id === current)!;
        const toNode = nodes.find(n => n.id === neighbor)!;
        const weight = Math.round(Math.hypot(fromNode.x - toNode.x, fromNode.y - toNode.y) / 10);
        
        const newDist = distances[current] + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          parents[neighbor] = current;
          if (!pq.includes(neighbor)) pq.push(neighbor);
          
          const edgeId = [current, neighbor].sort().join('-');
          setVisitedEdges(prev => new Set(prev).add(edgeId));
          await sleep(300);
        }
      }
    }

    // Backtrack to show path
    if (isTraversingRef.current && parents[endId] !== null) {
      let pathNode = endId;
      const pathEdges = new Set<string>();
      const pathNodes = new Set<number>();
      
      while (pathNode !== null && isTraversingRef.current) {
        pathNodes.add(pathNode);
        const p = parents[pathNode];
        if (p !== null) {
          pathEdges.add([pathNode, p].sort().join('-'));
        }
        pathNode = p!;
        setVisitedNodes(new Set(pathNodes));
        setVisitedEdges(new Set(pathEdges));
        await sleep(300);
      }
    }

    setActiveNode(null);
    setIsTraversing(false);
    isTraversingRef.current = false;
  };

  const addNodeWithAnim = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isTraversing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const tooClose = nodes.some(n => Math.hypot(n.x - x, n.y - y) < 40);
    if (tooClose) return;

    const newId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 1;
    setNodes([...nodes, { id: newId, x, y }]);
  };

  const handleNodeClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTraversing) {
      // Use this node as start node for algorithms if no traversal is active
      return;
    }
    if (selectedNode === null) {
      setSelectedNode(id);
    } else if (selectedNode !== id) {
      if (!edges.find(edge => (edge.from === selectedNode && edge.to === id) || (edge.from === id && edge.to === selectedNode))) {
        setEdges([...edges, { from: selectedNode, to: id }]);
      }
      setSelectedNode(null);
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <div className="graph-visualizer hd-root">
      <div className="controls flex flex-wrap items-center gap-4 mb-4 bg-bg-secondary p-3 rounded-lg border border-glass-border">
        <div className="flex flex-col">
          <span className="text-[10px] text-text-secondary uppercase font-bold mb-1">Canvas Edits</span>
          <div className="flex gap-2">
            <button className="nav-item active text-xs py-1.5" onClick={() => { setNodes([]); setEdges([]); resetTraversal(); }} disabled={isTraversing}>
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-glass-border mx-1" />

        <div className="flex flex-col">
          <span className="text-[10px] text-text-secondary uppercase font-bold mb-1">Algorithms</span>
          <div className="flex gap-2">
            <button 
              className={`nav-item ${isTraversing ? 'bg-glass-border' : 'active'} text-xs py-1.5`} 
              onClick={() => nodes.length > 0 && runBFS(nodes[0].id)}
              disabled={isTraversing || nodes.length === 0}
            >
              <Zap size={14} /> BFS
            </button>
            <button 
              className={`nav-item ${isTraversing ? 'bg-glass-border' : 'active'} text-xs py-1.5`} 
              onClick={() => nodes.length > 0 && runDFS(nodes[0].id)}
              disabled={isTraversing || nodes.length === 0}
            >
              <Zap size={14} /> DFS
            </button>
            <button 
              className={`nav-item ${isTraversing ? 'bg-glass-border' : 'active'} text-xs py-1.5`} 
              onClick={() => nodes.length > 1 && setDijkstraNodes({ start: nodes[0].id, end: nodes[nodes.length - 1].id })}
              disabled={isTraversing || nodes.length < 2}
            >
              <Zap size={14} /> Dijkstra
            </button>
            <button 
              className="nav-item active text-xs py-1.5 border-red-500/50 hover:bg-red-500/20" 
              onClick={() => { resetTraversal(); setDijkstraNodes({ start: null, end: null }); }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {dijkstraNodes.start !== null && (
          <div className="flex gap-2 items-center animate-fadeIn">
            <span className="text-[10px] text-accent-primary font-bold">Dijkstra:</span>
            <button className="nav-item active text-[10px] py-1 px-2" onClick={() => runDijkstra(dijkstraNodes.start!, dijkstraNodes.end!)}>
              Run {dijkstraNodes.start} → {dijkstraNodes.end}
            </button>
          </div>
        )}
        
        <div className="ml-auto text-[11px] text-text-secondary italic">
          {isTraversing ? 'Traversing graph...' : 'Click canvas to add nodes, connect nodes to add edges.'}
        </div>
      </div>

      <div className="visualizer-container relative min-h-[500px] border border-glass-border rounded-xl bg-black/40 overflow-hidden shadow-inner">
        <svg width="100%" height="500" onClick={addNodeWithAnim} style={{ cursor: isTraversing ? 'default' : 'crosshair' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {edges.map((edge, idx) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            const edgeId = [edge.from, edge.to].sort().join('-');
            const isVisited = visitedEdges.has(edgeId);

            return (
              <motion.line 
                key={`${edge.from}-${edge.to}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  stroke: isVisited ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                  strokeWidth: isVisited ? 3 : 2,
                  strokeDasharray: isVisited ? 'none' : '5,5'
                }}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                transition={{ duration: 0.5 }}
              />
            );
          })}

          {nodes.map((node) => {
            const isVisited = visitedNodes.has(node.id);
            const isActive = activeNode === node.id;
            const isSelected = selectedNode === node.id;

            return (
              <g key={node.id} onClick={(e) => handleNodeClick(node.id, e)} style={{ cursor: 'pointer' }}>
                <motion.circle 
                  cx={node.x} cy={node.y} r="22" 
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    fill: isActive ? 'var(--accent-primary)' : isVisited ? 'var(--accent-secondary)' : 'var(--bg-secondary)',
                    stroke: isActive || isSelected ? 'white' : isVisited ? 'var(--accent-primary)' : 'var(--glass-border)',
                    strokeWidth: isActive || isSelected ? 3 : 2,
                  }}
                  whileHover={{ scale: 1.1 }}
                  filter={isActive ? 'url(#glow)' : ''}
                />
                <text 
                  x={node.x} y={node.y + 5} 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize="12" 
                  fontWeight="bold" 
                  pointerEvents="none"
                >
                  {node.id}
                </text>
                
                {isActive && (
                  <motion.circle
                    cx={node.x} cy={node.y} r="30"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;
