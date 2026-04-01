import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';
import { Palette, Box, Layers } from 'lucide-react';

const cssCards = flashcardsData.filter(card => card.topicId === 'css');

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Styling the Web</h3>
      <p className="mb-4">
        CSS (Cascading Style Sheets) is the language used for describing the presentation of a document written in a markup language like HTML. It handles the <strong>layout</strong>, <strong>colors</strong>, <strong>fonts</strong>, and <strong>visual effects</strong>.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-blue-500 mb-2">Core Concepts</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Selectors:</strong> Target specific HTML elements (e.g., .class, #id, element).</li>
          <li><strong>The Box Model:</strong> Content, Padding, Border, and Margin.</li>
          <li><strong>Cascading & Specificity:</strong> Determining which rule wins based on weight and order.</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">Advanced Layouts</h3>
      <ul className="space-y-3">
        <li className="bg-card p-3 rounded border border-border flex items-start gap-4">
          <Box className="text-blue-500 shrink-0" size={24} />
          <div>
            <p className="text-sm font-bold">Flexbox</p>
            <p className="text-xs text-text-secondary">One-dimensional layout model for aligning items efficiently.</p>
          </div>
        </li>
        <li className="bg-card p-3 rounded border border-border flex items-start gap-4">
          <Layers className="text-indigo-500 shrink-0" size={24} />
          <div>
            <p className="text-sm font-bold">Grid</p>
            <p className="text-xs text-text-secondary">Two-dimensional layout system for building complex structured layouts.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const CSSDetails = () => {
  return (
    <TopicLayout
      topicId="css"
      title="Mastering CSS"
      description="Learn the art of styling web pages with the box model, flexbox, and grid systems."
      videoId="1rsS69GfT58" // CodeHelp CSS 1
      theoryContent={theoryContent}
    >
      <div className="space-y-12">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center border-blue-500/30">
          <Palette className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold mb-2">Visual Design</h3>
          <p className="text-text-secondary max-w-lg">
            CSS allows you to transform raw HTML into beautiful, interactive, and responsive experiences for your users.
          </p>
        </div>
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={cssCards} title="CSS Knowledge Check" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default CSSDetails;
