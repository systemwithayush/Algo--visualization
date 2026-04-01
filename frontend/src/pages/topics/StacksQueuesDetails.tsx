import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import StackQueueVisualizer from '../../components/visualization/StackQueueVisualizer';
import { FlashcardData } from '../../components/course/FlashcardSystem';

const flashcards: FlashcardData[] = [
  { question: "What is the acronym describing a Stack?", answer: "LIFO (Last In, First Out). The last element added is the first one to be removed." },
  { question: "What is the acronym describing a Queue?", answer: "FIFO (First In, First Out). The first element added is the first one to be removed." },
  { question: "What are the primary Stack operations?", answer: "Push (add element to top) and Pop (remove element from top)." },
  { question: "What are the primary Queue operations?", answer: "Enqueue (add to rear) and Dequeue (remove from front)." },
  { question: "Time complexity of Push and Pop in a Stack?", answer: "O(1) because both operations happen strictly at the top of the stack." }
];

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Understanding Stacks</h3>
      <p className="mb-4">
        A Stack is a linear data structure that follows the <strong>Last In, First Out (LIFO)</strong> principle. This means that the element placed last is accessed first.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-accent-primary mb-2">Primary Operations:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Push:</strong> Adds an item to the top of the stack.</li>
          <li><strong>Pop:</strong> Removes an item from the top of the stack.</li>
          <li><strong>Peek/Top:</strong> Returns the top element without removing it.</li>
          <li><strong>isEmpty:</strong> Returns true if the stack is empty, else false.</li>
        </ul>
      </div>
    </div>

    <div>
       <h3 className="text-xl font-bold mb-3 text-text-primary">Understanding Queues</h3>
       <p className="mb-4">
         A Queue is a linear structure that follows the <strong>First In, First Out (FIFO)</strong> principle. Simply put, whoever comes first gets served first, exactly like a real-world queue in a cafeteria.
       </p>
       <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
         <h4 className="font-semibold text-accent-secondary mb-2">Primary Operations:</h4>
         <ul className="list-disc list-inside space-y-1 text-sm">
           <li><strong>Enqueue:</strong> Adds an item to the <em>rear</em> of the queue.</li>
           <li><strong>Dequeue:</strong> Removes an item from the <em>front</em> of the queue.</li>
           <li><strong>Front:</strong> Get the front item without removing it.</li>
           <li><strong>Rear:</strong> Get the last item.</li>
         </ul>
       </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Time Complexity</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-black/10 dark:bg-white/10 uppercase font-semibold text-xs text-secondary">
          <tr>
            <th className="px-4 py-2 border border-border">Data Structure</th>
            <th className="px-4 py-2 border border-border">Insertion</th>
            <th className="px-4 py-2 border border-border">Deletion</th>
            <th className="px-4 py-2 border border-border">Access</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          <tr><td className="px-4 py-2 border border-border">Stack</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
          <tr><td className="px-4 py-2 border border-border">Queue</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-green-500">O(1)</td><td className="px-4 py-2 font-mono border border-border text-red-500">O(n)</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Real-world Examples</h3>
      <p className="text-sm">
        <strong>Stack:</strong> Reversing a word, Undo mechanisms in Text Editors, Browser Back buttons (a stack of visited URLs).
      </p>
      <p className="text-sm mt-3">
        <strong>Queue:</strong> Task scheduling in OS (CPU job queues), Printer spooler (print jobs in order), Spotify Song Queue.
      </p>
    </div>
  </div>
);

const StacksQueuesDetails = () => {
  return (
    <TopicLayout
      topicId="stack-queue"
      title="Stacks & Queues"
      description="Understand constraint-based linear data storage utilizing LIFO and FIFO architecture."
      videoId="I37kOm-X2Hk" // Abdul Bari Stack/Queue
      theoryContent={theoryContent}
      flashcards={flashcards}
    >
      <StackQueueVisualizer />
    </TopicLayout>
  );
};

export default StacksQueuesDetails;
