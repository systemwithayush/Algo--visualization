import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import TreeVisualizer from '../../components/visualization/TreeVisualizer';
import { FlashcardData } from '../../components/course/FlashcardSystem';

const flashcards: FlashcardData[] = [
  { question: "What is a Tree Data Structure?", answer: "A non-linear, hierarchical data structure consisting of nodes connected by edges." },
  { question: "What is a Binary Search Tree (BST)?", answer: "A tree where each node has at most 2 children. The left child is smaller, and the right child is larger than the parent node." },
  { question: "What are the rules of Inorder Traversal?", answer: "Left Subtree -> Root Node -> Right Subtree. (In a BST, this prints elements in sorted order!)." },
  { question: "Time complexity to search an element in a balanced BST?", answer: "O(log n). The height of the tree dictates the worst-case search path." }
];

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Tree Data Structure</h3>
      <p className="mb-4">
        Unlike Arrays, Linked Lists, Stack and queues, which are linear data structures, trees are <strong>hierarchical data structures</strong>. The top-most node is called the <strong>Root</strong>.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-primary mb-2">Key Terminology</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Root:</strong> The topmost node of a tree.</li>
          <li><strong>Edge:</strong> The link connecting two nodes.</li>
          <li><strong>Leaf Node:</strong> A node that does not have any children.</li>
          <li><strong>Height of a Tree:</strong> The longest path from the root node to any leaf.</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Binary Search Tree (BST)</h3>
      <p className="text-sm mb-3">A Binary Search Tree is a node-based binary tree data structure which has the following properties:</p>
      <ul className="space-y-3">
        <li className="bg-card p-3 rounded border border-border">
          The left subtree of a node contains only nodes with keys <strong>less than</strong> the node's key.
        </li>
        <li className="bg-card p-3 rounded border border-border">
          The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node's key.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Tree Traversals</h3>
      <p className="text-sm mb-3">Unlike arrays, trees can be traversed in multiple ways:</p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border space-y-2">
         <p><strong>In-Order (LNR):</strong> Traverse left subtree, visit node, traverse right subtree.</p>
         <p><strong>Pre-Order (NLR):</strong> Visit node, traverse left subtree, traverse right subtree.</p>
         <p><strong>Post-Order (LRN):</strong> Traverse left subtree, traverse right subtree, visit node.</p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Time Complexity</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Operation</th>
            <th className="px-4 py-2 border border-border">Balanced Tree</th>
            <th className="px-4 py-2 border border-border">Skewed Tree (Worst Case)</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border">Search</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(log n)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Insert</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(log n)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Delete</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(log n)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const TreesDetails = () => {
  return (
    <TopicLayout
      topicId="trees"
      title="Trees & BST"
      description="Hierarchical non-linear data structures representing relationships mapping."
      videoId="qH6yxkw0u78" // Abdul Bari Trees
      theoryContent={theoryContent}
      flashcards={flashcards}
    >
      <TreeVisualizer />
    </TopicLayout>
  );
};

export default TreesDetails;
