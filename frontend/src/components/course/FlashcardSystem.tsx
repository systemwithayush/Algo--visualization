import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export interface FlashcardData {
  question: string;
  answer: string;
}

interface FlashcardSystemProps {
  cards: FlashcardData[];
}

const FlashcardSystem = ({ cards }: FlashcardSystemProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const card = cards[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
          ⚡ Quick Test: Flashcards
        </h3>
        <span className="text-sm font-medium bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full text-secondary">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div className="relative h-[250px] w-full perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of Card (Question) */}
          <div 
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl shadow-neon-glow"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-accent-secondary">Front</span>
            <h4 className="text-xl md:text-2xl font-semibold text-center text-text-primary leading-relaxed">
              {card.question}
            </h4>
            <p className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">Click to Reveal Answer</p>
          </div>

          {/* Back of Card (Answer) */}
          <div 
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-black/5 dark:bg-white/5 border border-accent-primary rounded-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-accent-primary">Back</span>
            <p className="text-lg text-center text-text-primary">
              {card.answer}
            </p>
            <p className="absolute bottom-4 text-sm text-accent-primary font-medium flex items-center gap-1">
              <RotateCcw size={14} /> Click to Flip Back
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={handlePrev}
          className="p-3 bg-card hover:bg-black/5 dark:hover:bg-white/5 border border-border rounded-full transition-colors text-text-primary"
          aria-label="Previous Flashcard"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="p-3 bg-card hover:bg-black/5 dark:hover:bg-white/5 border border-border rounded-full transition-colors text-text-primary"
          aria-label="Next Flashcard"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardSystem;
