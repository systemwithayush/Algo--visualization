import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import LinkedListVisualizer from '../../components/visualization/LinkedListVisualizer';
import { FlashcardData } from '../../components/course/FlashcardSystem';

const flashcards: FlashcardData[] = [
  { question: "What is a Linked List?", answer: "A linear data structure where elements are not stored in contiguous memory, but instead linked using pointers." },
  { question: "What is the time complexity to insert a node at the head?", answer: "O(1) - You only need to update the new node's pointer and the head reference." },
  { question: "What is the primary disadvantage of Linked Lists vs Arrays?", answer: "No random access. To reach the nth element, you must traverse O(n) nodes. Also, extra memory is required for pointers." },
  { question: "What is a Doubly Linked List?", answer: "A list where each node contains pointers to both the next node AND the previous node." }
];

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">What is a Linked List?</h3>
      <p className="mb-4">
        A linked list is a linear data structure that consists of a series of nodes. Unlike arrays, elements in a linked list are not stored in contiguous memory locations. Instead, each element (node) contains two parts: the <strong>data</strong> and a <strong>reference (pointer)</strong> to the next node in the sequence.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-primary mb-2">Advantages over Arrays</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Dynamic Size:</strong> Can grow or shrink at runtime seamlessly without re-allocating memory.</li>
          <li><strong>Efficient Insertion/Deletion:</strong> Adding or removing a node (especially at the head/tail) is O(1) if you have the pointer, as it doesn't require shifting elements.</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Types of Linked Lists</h3>
      <ul className="space-y-3">
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-blue-500">Singly Linked List:</span> Navigation is forward-only. Each node points to the next node. The last node points to <code className="bg-black/10 px-1 rounded">null</code>.
        </li>
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-green-500">Doubly Linked List:</span> Two-way navigation. Nodes have pointers to both the <em>next</em> and <em>previous</em> nodes.
        </li>
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-purple-500">Circular Linked List:</span> The last node points back to the first node instead of <code className="bg-black/10 px-1 rounded">null</code>, creating a circle.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Time Complexity</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Operation</th>
            <th className="px-4 py-2 border border-border">Worst Case</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border">Access (A[i])</td><td className="px-4 py-2 font-mono border border-border">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Search</td><td className="px-4 py-2 font-mono border border-border">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Insertion (at Head)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Deletion (at Head)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Real-world Example</h3>
      <p className="text-sm">
        A music playlist is a great analogy for a Linked List. The "current song" only needs to know what the "next song" is (Singly Linked) and perhaps what the "previous song" was (Doubly Linked).
      </p>
    </div>
  </div>
);

const LinkedListsDetails = () => {
  return (
    <TopicLayout
      topicId="linked-list"
      title="Linked Lists"
      description="Understand dynamic memory allocations, nodes, and pointers replacing contiguous arrays."
      videoId="D2vI2PNMrZA" // Jenny's Lectures Linked list
      theoryContent={theoryContent}
      flashcards={flashcards}
    >
      <LinkedListVisualizer />
    </TopicLayout>
  );
};

export default LinkedListsDetails;
