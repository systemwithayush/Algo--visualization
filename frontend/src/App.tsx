import React from 'react';
import { BarChart2, Search, TreeDeciduous, Code, Zap } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SortingVisualizer from './components/visualization/SortingVisualizer';
import SearchingVisualizer from './components/visualization/SearchingVisualizer';
import LinkedListVisualizer from './components/visualization/LinkedListVisualizer';
import StackQueueVisualizer from './components/visualization/StackQueueVisualizer';
import TreeVisualizer from './components/visualization/TreeVisualizer';
import GraphVisualizer from './components/visualization/GraphVisualizer';
import CodeSandbox from './components/visualization/CodeSandbox';
import PerformanceDashboard from './components/visualization/PerformanceDashboard';
import AlgoInfo from './components/visualization/AlgoInfo';
import ArrayVisualizer from './components/visualization/ArrayVisualizer';
import HomeDashboard from './components/HomeDashboard';
import './index.css';

function App() {
  const [mode, setMode] = React.useState<'sorting' | 'searching' | 'ds' | 'trees' | 'graphs' | 'sandbox' | 'performance' | 'dashboard'>('dashboard');
  const [dsSubMode, setDsSubMode] = React.useState<'linked-list' | 'stack-queue' | 'arrays'>('arrays');

  return (
    <div className="app-container">
      <Sidebar onNavigate={(m: any) => setMode(m)} activeId={mode} />
      <main className="main-content">
        <div className="glass-card" style={{ padding: '24px' }}>
          <h1 style={{ marginBottom: '8px' }}>
            {mode === 'sorting' ? 'Sorting Algorithms' : 
             mode === 'searching' ? 'Searching Algorithms' : 
             mode === 'ds' ? (dsSubMode === 'linked-list' ? 'Linked List' : dsSubMode === 'arrays' ? 'Arrays' : 'Stack & Queue') : 
             mode === 'trees' ? 'Binary Search Tree' : 
             mode === 'graphs' ? 'Graph Visualizer' : 
             mode === 'sandbox' ? 'Algorithm Sandbox' :
             mode === 'performance' ? 'Performance Metrics' :
             'AlgoLabs Dashboard'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {mode === 'sorting' ? 'Observe how different sorting algorithms organize data step-by-step.' : 
             mode === 'searching' ? 'Visualize linear and binary search techniques.' : 
             mode === 'ds' ? 'Interactive data structure operations with real-time animations.' :
             mode === 'trees' ? 'Visualize BST insertions and self-balancing behavior.' : 
             mode === 'graphs' ? 'Interactive graph creation and traversal algorithms.' : 
             mode === 'sandbox' ? 'Write and test your own algorithms in real-time.' :
             mode === 'performance' ? 'Compare algorithm efficiency using data-driven charts.' :
             'Welcome to your interactive DSA learning laboratory.'}
          </p>
        </div>

        {mode === 'ds' && (
          <div className="flex gap-4 mb-4">
            <button
              className={`nav-item ${dsSubMode === 'arrays' ? 'active' : ''}`}
              onClick={() => setDsSubMode('arrays')}
            >
              Arrays
            </button>
            <button
              className={`nav-item ${dsSubMode === 'linked-list' ? 'active' : ''}`}
              onClick={() => setDsSubMode('linked-list')}
            >
              Linked List
            </button>
            <button
              className={`nav-item ${dsSubMode === 'stack-queue' ? 'active' : ''}`}
              onClick={() => setDsSubMode('stack-queue')}
            >
              Stack & Queue
            </button>
          </div>
        )}

        {mode === 'sorting' && (
          <>
            <SortingVisualizer />
            <AlgoInfo
              title="Bubble Sort"
              description="Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
              bestCase="O(n)"
              averageCase="O(n²)"
              worstCase="O(n²)"
              spaceComplexity="O(1)"
              pseudocode={[
                "procedure bubbleSort(A : list of sortable items)",
                "    n := length(A)",
                "    repeat",
                "        swapped := false",
                "        for i := 1 to n-1 inclusive do",
                "            if A[i-1] > A[i] then",
                "                swap(A[i-1], A[i])",
                "                swapped := true",
                "        n := n - 1",
                "    until not swapped",
                "end procedure"
              ]}
            />
          </>
        )}
        {mode === 'searching' && <SearchingVisualizer />}
        {mode === 'ds' && dsSubMode === 'arrays' && (
          <>
            <ArrayVisualizer />
            <AlgoInfo
              title="Array Search (Linear)"
              description="A systematic check of each element in a sequence until the target value is found or the end of the data is reached."
              bestCase="O(1)"
              averageCase="O(n)"
              worstCase="O(n)"
              spaceComplexity="O(1)"
              pseudocode={[
                "for each item in list:",
                "  if item == target:",
                "    return item index",
                "return not found"
              ]}
            />
          </>
        )}
        {mode === 'ds' && dsSubMode === 'linked-list' && (
          <>
            <LinkedListVisualizer />
            <AlgoInfo
              title="Singly Linked List"
              description="A sequence of elements where each element points to the next, allowing for efficient insertions and deletions."
              bestCase="Access: O(n)"
              averageCase="Delete: O(1)"
              worstCase="Search: O(n)"
              spaceComplexity="O(n)"
              pseudocode={[
                "current = head",
                "while current is not NULL:",
                "  if current.data == target:",
                "    return FOUND",
                "  current = current.next",
                "return NOT FOUND"
              ]}
            />
          </>
        )}
        {mode === 'ds' && dsSubMode === 'stack-queue' && (
          <>
            <StackQueueVisualizer />
            <AlgoInfo
              title="Stack & Queue"
              description="A Stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (TOP). A Queue is a First-In-First-Out (FIFO) data structure where elements are added at the REAR and removed from the FRONT."
              bestCase="Push/Pop: O(1)"
              averageCase="Enqueue/Dequeue: O(1)"
              worstCase="Search: O(n)"
              spaceComplexity="O(n)"
              pseudocode={[
                "// Stack (LIFO)",
                "push(value):",
                "  top = top + 1",
                "  stack[top] = value",
                "",
                "pop():",
                "  value = stack[top]",
                "  top = top - 1",
                "  return value"
              ]}
            />
          </>
        )}
        {mode === 'trees' && <TreeVisualizer />}
        {mode === 'graphs' && <GraphVisualizer />}
        {mode === 'sandbox' && <CodeSandbox />}
        {mode === 'performance' && <PerformanceDashboard />}
        {mode === 'dashboard' && <HomeDashboard onNavigate={(m) => setMode(m as any)} />}

        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3>Recent Progress</h3>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>You haven't started any algorithms yet.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3>Recommended</h3>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Quick Sort Visualization</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
