import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import ArrayVisualizer from '../../components/visualization/ArrayVisualizer';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';

const arrayCards = flashcardsData.filter(card => card.topicId === 'arrays');

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Understanding Arrays</h3>
      <p className="mb-4">
        An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together, making it easier to calculate the position of each element by simply adding an offset to a base value.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-primary mb-2">Key Characteristics</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Contiguous Memory:</strong> Elements sit neatly next to each other.</li>
          <li><strong>Fixed Size (Static):</strong> Traditional arrays must declare their size upfront.</li>
          <li><strong>Homogeneous:</strong> Stores elements of the same data type.</li>
        </ul>
      </div>
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
          <tr><td className="px-4 py-2 border border-border">Access (A[i])</td><td className="px-4 py-2 font-mono border border-border">O(1)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Linear Search</td><td className="px-4 py-2 font-mono border border-border">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Binary Search</td><td className="px-4 py-2 font-mono border border-border">O(log n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Insertion / Deletion</td><td className="px-4 py-2 font-mono border border-border">O(n)</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Real-world Example</h3>
      <p className="text-sm">
        Think of an array like a row of mailboxes in a post office. Each mailbox has an assigned number (index). If you know the number, you can walk directly to it in one step (O(1)). However, if you're looking for a specific letter (value), you might have to check every single mailbox (Linear Search - O(n)).
      </p>
    </div>
  </div>
);

const ArraysDetails = () => {
  return (
    <TopicLayout
      topicId="arrays"
      title="Arrays in DSA"
      description="Master the fundamental data structure: contiguous memory, static vs dynamic, and core traversal algorithms."
      videoId="37E9ckMDdTk" // CodeHelp Complete Array video
      theoryContent={theoryContent}
    >
      <div className="space-y-12">
        <ArrayVisualizer />
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={arrayCards} title="Array Fundamentals Review" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default ArraysDetails;
