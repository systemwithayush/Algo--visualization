import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import SearchingVisualizer from '../../components/visualization/SearchingVisualizer';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';

const searchingCards = flashcardsData.filter(card => card.topicId === 'searching');

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
    >
      <div className="space-y-12">
        <SearchingVisualizer />
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={searchingCards} title="Searching Review" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default SearchingDetails;
