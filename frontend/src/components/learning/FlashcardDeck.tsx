import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, BrainCircuit } from 'lucide-react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '../../data/flashcards';

interface FlashcardDeckProps {
  cards: FlashcardType[];
  title?: string;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards, title = "Knowledge Check" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!cards || cards.length === 0) {
    return <div className="p-4 text-center text-text-secondary glass-card">No flashcards available for this topic yet.</div>;
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BrainCircuit className="text-accent-secondary" /> {title}
        </h2>
        <div className="text-sm font-bold bg-white/10 px-4 py-2 rounded-full">
          {completed ? "Completed" : `Card ${currentIndex + 1} of ${cards.length}`}
        </div>
      </div>

      {!completed ? (
        <div className="w-full">
          {/* Key to force re-render/reset state of flip when index changes */}
          <Flashcard key={cards[currentIndex].id} card={cards[currentIndex]} onAnswer={handleAnswer} />
          
          <div className="flex items-center justify-between mt-6">
            <button 
              className={`nav-item flex items-center gap-2 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'active'}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            
            <button 
              className="nav-item active flex items-center gap-2"
              onClick={handleNext}
            >
              {currentIndex === cards.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center border-accent-secondary border">
          <div className="text-6xl mb-6">🎉</div>
          <h3 className="text-3xl font-bold mb-4">Deck Completed!</h3>
          <p className="text-xl text-text-secondary mb-8">
            You scored {score} on exactly matched MCQs and reviewed {cards.length} concepts.
          </p>
          <button className="btn-primary flex items-center gap-2 px-8 py-3 text-lg" onClick={resetDeck}>
            <RotateCcw size={20} /> Restart Deck
          </button>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="w-full bg-black/40 h-2 rounded-full mt-4 overflow-hidden border border-glass-border">
        <div 
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ease-out"
          style={{ width: `${completed ? 100 : ((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default FlashcardDeck;
