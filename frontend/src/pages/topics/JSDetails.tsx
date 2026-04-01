import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';
import { Terminal, Cpu, Zap } from 'lucide-react';

const jsCards = flashcardsData.filter(card => card.topicId === 'js');

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">The Power of Logic</h3>
      <p className="mb-4">
        JavaScript (JS) is a high-level, dynamic programming language that is a core technology of the World Wide Web. It enables interactive web pages and is an essential part of web applications.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-yellow-500 mb-2">Core Concepts</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Variables:</strong> Declared using let, const, and var.</li>
          <li><strong>Functions:</strong> Reusable blocks of code that perform specific tasks.</li>
          <li><strong>Asynchronous JS:</strong> Promises, async/await for non-blocking execution.</li>
          <li><strong>The DOM:</strong> Manipulating HTML and CSS in real-time.</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Modern JS Ecosystem</h3>
      <p className="text-sm mb-4">
        JavaScript has grown beyond the browser with Node.js, and powerful frameworks like React, Vue, and Angular.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card p-3 rounded border border-border flex items-center gap-3">
          <Terminal className="text-yellow-500" size={20} />
          <span className="text-xs font-semibold uppercase">ES6+ Syntax</span>
        </div>
        <div className="bg-card p-3 rounded border border-border flex items-center gap-3">
          <Cpu className="text-green-500" size={20} />
          <span className="text-xs font-semibold uppercase">Single-Threaded</span>
        </div>
      </div>
    </div>
  </div>
);

const JSDetails = () => {
  return (
    <TopicLayout
      topicId="js"
      title="JavaScript Essentials"
      description="Learn the logic of the web from basic variables and functions to advanced asynchronous programming."
      videoId="Z9q7IF79T2w" // CodeHelp JS 1
      theoryContent={theoryContent}
    >
      <div className="space-y-12">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center border-yellow-500/30">
          <Zap className="w-16 h-16 text-yellow-500 mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2">Action & Interactivity</h3>
          <p className="text-text-secondary max-w-lg">
            JavaScript brings your static pages to life, allowing for real-time updates and interactive user experiences.
          </p>
        </div>
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={jsCards} title="JS Knowledge Check" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default JSDetails;
