import React, { useEffect } from 'react';
import FeedbackForm from '../feedback/FeedbackForm';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle, PlaySquare, Code, BookOpen } from 'lucide-react';
interface TopicLayoutProps {
  topicId: string;
  title: string;
  description: string;
  videoId: string;
  theoryContent: React.ReactNode;
  children: React.ReactNode; // The visualizer
}

const TopicLayout = ({ topicId, title, description, videoId, theoryContent, children }: TopicLayoutProps) => {
  const { markTopicComplete, setRecentTopic, completedTopics } = useProgress();
  const isCompleted = completedTopics.includes(topicId);

  useEffect(() => {
    setRecentTopic(topicId);
  }, [topicId, setRecentTopic]);

  return (
    <div className="max-w-7xl mx-auto w-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary mb-3">{title}</h1>
          <p className="text-lg text-secondary max-w-3xl">{description}</p>
        </div>
        {!isCompleted ? (
          <button onClick={() => markTopicComplete(topicId)} className="bg-card border border-border hover:border-accent-primary text-text-primary px-4 py-2 rounded-lg flex items-center gap-2 shrink-0 transition-colors shadow-sm">
            <CheckCircle className="w-5 h-5 text-secondary" />
            Mark Complete
          </button>
        ) : (
          <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-2 rounded-lg flex items-center gap-2 shrink-0 shadow-sm font-medium">
            <CheckCircle className="w-5 h-5" />
            Completed
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* Main Visualizer Area */}
          <section className="glass-card p-0 overflow-hidden border border-border flex flex-col">
            <div className="bg-black/5 dark:bg-white/5 border-b border-border p-4 flex items-center gap-2 font-semibold">
              <Code className="w-5 h-5 text-accent-primary" /> Interactive Visualizer
            </div>
            <div className="p-4 md:p-6 bg-background relative" style={{ minHeight: '500px' }}>
              {children}
            </div>
          </section>
          
          {/* Lecture Embed */}
          <section className="glass-card overflow-hidden border border-border">
            <div className="bg-black/5 dark:bg-white/5 border-b border-border p-4 flex items-center gap-2 font-semibold">
              <PlaySquare className="w-5 h-5 text-accent-secondary" /> Video Lecture
            </div>
            <div className="aspect-video w-full bg-black/10">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={`${title} Lecture`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>

        </div>

        <div className="xl:col-span-1">
          {/* Theory Section Sidebar */}
          <div className="glass-card border border-border sticky top-6">
            <div className="bg-black/5 dark:bg-white/5 border-b border-border p-4 flex items-center gap-2 font-semibold">
              <BookOpen className="w-5 h-5 text-blue-500" /> Theory Notes
            </div>
            <div className="p-6 prose dark:prose-invert prose-sm xl:prose-base max-w-none text-text-primary">
               {theoryContent}
            </div>
          </div>
        </div>
      </div>


      {/* Feedback Form */}
      <FeedbackForm topicId={title} />
    </div>
  );
};

export default TopicLayout;
