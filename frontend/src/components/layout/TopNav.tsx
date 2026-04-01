import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Github } from 'lucide-react';

const TopNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-primary hidden sm:block">Interactive DSA Platform</h2>
      </div>
      <div className="flex items-center gap-4">
        <a 
          href="https://github.com/systemwithayush/Algo--visualization" 
          target="_blank" 
          rel="noreferrer"
          className="p-2 text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          title="GitHub Repository"
        >
          <Github className="w-5 h-5" />
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default TopNav;
