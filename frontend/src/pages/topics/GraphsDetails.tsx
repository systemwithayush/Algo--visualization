import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import GraphVisualizer from '../../components/visualization/GraphVisualizer';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';

const graphCards = flashcardsData.filter(card => card.topicId === 'graphs');

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">What is a Graph?</h3>
      <p className="mb-4">
        A Graph is a non-linear data structure consisting of vertices (or nodes) and edges. Given a graph <strong>G = (V, E)</strong>, V represents a set of vertices and E represents a set of edges.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-primary mb-2">Key Graph Formats</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Directed Graph:</strong> Edges have a direction (e.g., Twitter followers).</li>
          <li><strong>Undirected Graph:</strong> Edges have no direction (e.g., Facebook friends).</li>
          <li><strong>Weighted Graph:</strong> Edges carry a weight or cost (e.g., Google Maps distances).</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Graph Representations</h3>
      <ul className="space-y-3">
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-blue-500">Adjacency Matrix:</span> A 2D array of size `V x V` where `A[i][j]` is 1 if there is an edge from vertex i to vertex j, otherwise 0. Best for dense graphs, but takes <code className="bg-black/10 px-1 rounded text-red-500">O(V&sup2;)</code> space.
        </li>
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-green-500">Adjacency List:</span> An array of Lists. The array size is `V`. Each array index `i` stores a list of vertices connected to the `i`-th vertex. Best for sparse graphs, space complexity is <code className="bg-black/10 px-1 rounded text-green-500">O(V + E)</code>.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Algorithms: BFS vs DFS</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Algorithm</th>
            <th className="px-4 py-2 border border-border">Data Structure Used</th>
            <th className="px-4 py-2 border border-border">Traversal Strategy</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border font-semibold">Breadth-First Search (BFS)</td><td className="px-4 py-2 font-mono border border-border text-blue-400">Queue (FIFO)</td><td className="px-4 py-2 border border-border">Discovers all neighbors at the current depth before moving deeper (Level by Level).</td></tr>
          <tr><td className="px-4 py-2 border border-border font-semibold">Depth-First Search (DFS)</td><td className="px-4 py-2 font-mono border border-border text-purple-400">Stack (LIFO)</td><td className="px-4 py-2 border border-border">Explores as far as possible along each branch before backtracking.</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Real-world Graph Uses</h3>
      <p className="text-sm">
        <strong>Social Networks:</strong> Person is a vertex, friend connection is an edge. <br/><br/>
        <strong>Google Maps:</strong> Intersection is a vertex, roads are weighted edges pointing to shortest path algorithms (Dijkstra's).
      </p>
    </div>
  </div>
);

const GraphsDetails = () => {
  return (
    <TopicLayout
      topicId="graphs"
      title="Graph Theory"
      description="Study network topologies, pathfinding, and vertex/edge relationships."
      videoId="pcKY4hjDrxk" // Abdul Bari Graphs
      theoryContent={theoryContent}
    >
      <div className="space-y-12">
        <GraphVisualizer />
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={graphCards} title="Graphs Review" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default GraphsDetails;
