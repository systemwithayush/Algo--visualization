import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flashcard as FlashcardType } from '../../data/flashcards';

interface FlashcardProps {
  card: FlashcardType;
  onAnswer?: (isCorrect: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsFlipped(true);
    if (onAnswer) {
      onAnswer(option === card.answer);
    }
  };

  return (
    <div className="relative w-full h-[400px] perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        onClick={handleFlip}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden glass-card p-8 flex flex-col items-center justify-center border border-glass-border">
          <div className="absolute top-4 right-4 text-xs font-bold text-accent-primary bg-accent-primary/20 px-3 py-1 rounded-full uppercase">
            {card.type}
          </div>
          
          <h3 className="text-xl font-bold text-center mb-6">{card.question}</h3>
          
          {card.type === 'output' && card.codeSnippet && (
            <div className="w-full bg-black/40 p-4 rounded text-sm font-mono text-left mb-4 overflow-x-auto text-green-400">
              <pre>{card.codeSnippet}</pre>
            </div>
          )}
          
          {card.type === 'mcq' && card.options && (
            <div className="w-full grid grid-cols-1 gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
              {card.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-full py-3 px-4 rounded-lg border transition-all text-left
                    ${selectedOption === option 
                      ? 'bg-accent-primary/20 border-accent-primary' 
                      : 'bg-black/20 border-glass-border hover:border-accent-primary/50'}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {card.type !== 'mcq' && (
            <div className="mt-8 text-sm text-text-secondary animate-pulse">
              Click to flip and reveal answer
            </div>
          )}
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full backface-hidden glass-card p-8 flex flex-col items-center justify-center border border-accent-primary shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-4 right-4 text-xs font-bold text-text-secondary bg-white/10 px-3 py-1 rounded-full uppercase">
            Answer
          </div>
          
          <div className="text-2xl font-bold text-accent-secondary mb-6 text-center">
            {card.answer}
          </div>
          
          <div className="text-md text-text-secondary text-center leading-relaxed max-w-[80%]">
            {card.explanation}
          </div>

          <div className="absolute bottom-6 text-sm text-text-secondary">
            Click anywhere to flip back
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
