import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import SearchingVisualizer from '../../components/visualization/SearchingVisualizer';
import { FlashcardData } from '../../components/course/FlashcardSystem';

const flashcards: FlashcardData[] = [
  { question: "What is Linear Search?", answer: "An algorithm that checks every item in the sequential array until the target element is found." },
  { question: "What is the worst-case time complexity of Linear Search?", answer: "O(n). This occurs if the target is the very last element, or not in the array at all." },
  { question: "What is the primary condition for Binary Search to work?", answer: "The array/list MUST be sorted." },
  { question: "How does Binary Search work?", answer: "It repeatedly divides the search interval in half. If the target is less than the middle element, it searches the left half, otherwise the right half." }
];

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Searching Algorithms</h3>
      <p className="mb-4">
        Searching is the process of finding the position of a given target value within a list or array. It is a fundamental operation across databases and computation.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">1. Linear Search</h3>
      <p className="text-sm mb-3">
        Linear Search is the most basic search algorithm. In this type of search, a sequential search is made over all items one by one. Every item is checked and if a match is found then that particular item is returned, otherwise the search continues till the end of the data collection.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
         <p><strong>Use Case:</strong> Searching through small or mathematically unsorted arrays.</p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">2. Binary Search</h3>
      <p className="text-sm mb-3">
        Binary Search is a searching algorithm used in a <strong>sorted array</strong> by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the search space by half at every recursive step.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border space-y-2">
         <ul className="list-decimal list-inside space-y-1 text-sm text-text-primary">
            <li>Compare target `x` with the middle element `m`.</li>
            <li>If `x` matches `m`, we return the mid index!</li>
            <li>If `x` is greater than `m`, `x` can only lie in the right half subgroup. Ignore left half.</li>
            <li>Else, `x` is smaller, so explore the left half.</li>
         </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Algorithm Complexity Differences</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Algorithm</th>
            <th className="px-4 py-2 border border-border">Best Case</th>
            <th className="px-4 py-2 border border-border">Worst Case (Time)</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border font-semibold">Linear Search</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border font-semibold">Binary Search</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(log n)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const SearchingDetails = () => {
  return (
    <TopicLayout
      topicId="searching"
      title="Searching Algorithms"
      description="Learn algorithms designed to check for an element or retrieve it from any data structure where it is stored."
      videoId="V_T5NuccwPI" // Abdul Bari Binary Search
      theoryContent={theoryContent}
      flashcards={flashcards}
    >
      <SearchingVisualizer />
    </TopicLayout>
  );
};

export default SearchingDetails;
