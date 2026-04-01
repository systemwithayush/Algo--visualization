import React from 'react';
import TopicLayout from '../../components/course/TopicLayout';
import FlashcardDeck from '../../components/learning/FlashcardDeck';
import { flashcardsData } from '../../data/flashcards';
import { Layout, Globe, Code } from 'lucide-react';

const htmlCards = flashcardsData.filter(card => card.topicId === 'html');

const theoryContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">The Skeleton of the Web</h3>
      <p className="mb-4">
        HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web pages using a system of <strong>tags</strong> and <strong>attributes</strong>.
      </p>
      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg border border-border">
        <h4 className="font-semibold text-orange-500 mb-2">Core Concepts</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Elements:</strong> The building blocks (e.g., &lt;p&gt;, &lt;h1&gt;, &lt;div&gt;).</li>
          <li><strong>Attributes:</strong> Provide extra information (e.g., href, src, class, id).</li>
          <li><strong>Semantic HTML:</strong> Using tags that describe their meaning (e.g., &lt;article&gt;, &lt;nav&gt;).</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">HTML5 Features</h3>
      <p className="text-sm mb-4">
        HTML5 introduced powerful new features like native video/audio support, the canvas for 2D/3D graphics, and local storage capabilities.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card p-3 rounded border border-border flex items-center gap-3">
          <Layout className="text-orange-500" size={20} />
          <span className="text-xs font-semibold uppercase">Semantic tags</span>
        </div>
        <div className="bg-card p-3 rounded border border-border flex items-center gap-3">
          <Globe className="text-blue-500" size={20} />
          <span className="text-xs font-semibold uppercase">Web Storage</span>
        </div>
      </div>
    </div>
  </div>
);

const HTMLDetails = () => {
  return (
    <TopicLayout
      topicId="html"
      title="HTML Fundamentals"
      description="Master the core structure of the modern web with semantic elements and document hierarchy."
      videoId="HcOc7P5BMi4" // CodeHelp HTML 1
      theoryContent={theoryContent}
    >
      <div className="space-y-12">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center border-orange-500/30">
          <Code className="w-16 h-16 text-orange-500 mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2">Structure & Semantics</h3>
          <p className="text-text-secondary max-w-lg">
            HTML provides the meaningful structure for your applications. Combined with CSS for styling and JS for interactivity, it forms the "Triple Threat" of frontend development.
          </p>
        </div>
        
        <div className="border-t border-glass-border pt-8 w-full max-w-4xl mx-auto">
          <FlashcardDeck cards={htmlCards} title="HTML Knowledge Check" />
        </div>
      </div>
    </TopicLayout>
  );
};

export default HTMLDetails;
