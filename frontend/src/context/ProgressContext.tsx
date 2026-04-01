import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedTopics: string[];
  markTopicComplete: (topic: string) => void;
  recentTopic: string | null;
  setRecentTopic: (topic: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [recentTopic, setRecentTopicState] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('completedTopics');
    if (saved) setCompletedTopics(JSON.parse(saved));
    const recent = localStorage.getItem('recentTopic');
    if (recent) setRecentTopicState(recent);
  }, []);

  const markTopicComplete = (topic: string) => {
    setCompletedTopics(prev => {
      if (prev.includes(topic)) return prev;
      const next = [...prev, topic];
      localStorage.setItem('completedTopics', JSON.stringify(next));
      return next;
    });
  };

  const setRecentTopic = (topic: string) => {
    setRecentTopicState(topic);
    localStorage.setItem('recentTopic', topic);
  };

  return (
    <ProgressContext.Provider value={{ completedTopics, markTopicComplete, recentTopic, setRecentTopic }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
