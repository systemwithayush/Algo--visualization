import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import SortingVisualizer from '../../components/visualization/SortingVisualizer';
import { FlashcardData } from '../../components/course/FlashcardSystem';

const flashcards: FlashcardData[] = [
  { question: "What is Bubble Sort?", answer: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order." },
  { question: "Time complexity of Bubble and Selection Sort?", answer: "O(n²). These algorithms require nested loops over the array." },
  { question: "What is Merge Sort?", answer: "A Divide and Conquer algorithm that splits an array in half, sorts the halves, and merges them back together." },
  { question: "What is the best average case sorting time complexity?", answer: "O(n log n). Seen in Merge Sort, Quick Sort, and Heap Sort." }
];

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Sorting Algorithms</h3>
      <p className="mb-4">
        Sorting refers to arranging data in a particular order (e.g., ascending or descending). It fundamentally optimizes the usefulness of data—for instance, allowing Binary Search to work.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Comparison Based Algorithms</h3>
      <ul className="space-y-3">
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-blue-500 tracking-wide block mb-1">1. Bubble Sort:</span>
          Works by repeatedly swapping the adjacent elements if they are in the wrong order. Very inefficient for large datasets.
        </li>
        <li className="bg-card p-3 rounded border border-border">
          <span className="font-semibold text-green-500 tracking-wide block mb-1">2. Selection Sort:</span>
          Works by finding the minimum element from the unsorted part and placing it at the beginning.
        </li>
        <li className="bg-card p-3 rounded border border-border">
           <span className="font-semibold text-purple-500 tracking-wide block mb-1">3. Insertion Sort:</span>
           Works by iteratively inserting a key element into its correct position inside an already sorted prefix. Excellent for partially sorted arrays.
        </li>
      </ul>
    </div>

    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-secondary mb-2">Divide & Conquer Algorithms</h4>
        <p className="text-sm mb-2">
            <strong>Merge Sort:</strong> Divides array into two halves, sorts them recursively, and merges them. <code className="bg-black/10 px-1 rounded">O(n log n)</code> guaranteed.
        </p>
        <p className="text-sm">
            <strong>Quick Sort:</strong> Picks a 'pivot' element and partitions array around the pivot. <code className="bg-black/10 px-1 rounded">O(n log n)</code> average case, but <code className="bg-black/10 px-1 rounded text-red-500">O(n&sup2;)</code> worst case.
        </p>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Time Complexity</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Algorithm</th>
            <th className="px-4 py-2 border border-border">Best Case</th>
            <th className="px-4 py-2 border border-border">Worst Case</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border font-semibold">Bubble Sort</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(n)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n&sup2;)</td></tr>
          <tr><td className="px-4 py-2 border border-border font-semibold">Insertion Sort</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(n)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n&sup2;)</td></tr>
          <tr><td className="px-4 py-2 border border-border font-semibold">Merge Sort</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(n log n)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(n log n)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const SortingDetails = () => {
  return (
    <TopicLayout
      topicId="sorting"
      title="Sorting Algorithms"
      description="Visualize and analyze various algorithmic sorting techniques."
      videoId="pkkFqlG0Hds" // Abdul Bari Sorting Intro
      theoryContent={theoryContent}
      flashcards={flashcards}
    >
      <SortingVisualizer />
    </TopicLayout>
  );
};

export default SortingDetails;
