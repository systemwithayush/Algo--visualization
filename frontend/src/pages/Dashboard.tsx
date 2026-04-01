import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';
import { Code2, Network, ListTree, Database, Share2, Layers, Binary, Search, PlayCircle, Clock } from 'lucide-react';

const topics = [
  { id: 'arrays', name: 'Arrays', icon: Code2, desc: 'Linear collection of elements', path: '/topic/arrays', color: 'text-blue-500' },
  { id: 'linked-list', name: 'Linked List', icon: Network, desc: 'Sequential collection of nodes', path: '/topic/linked-list', color: 'text-green-500' },
  { id: 'stack-queue', name: 'Stacks & Queues', icon: Layers, desc: 'LIFO and FIFO structures', path: '/topic/stack-queue', color: 'text-purple-500' },
  { id: 'sorting', name: 'Sorting', icon: Binary, desc: 'Arrange elements carefully', path: '/topic/sorting', color: 'text-orange-500' },
  { id: 'searching', name: 'Searching', icon: Search, desc: 'Find target items efficiently', path: '/topic/searching', color: 'text-teal-500' },
  { id: 'trees', name: 'Trees', icon: ListTree, desc: 'Hierarchical node tracking', path: '/topic/trees', color: 'text-emerald-500' },
  { id: 'graphs', name: 'Graphs', icon: Share2, desc: 'Complex networked nodes', path: '/topic/graphs', color: 'text-red-500' },
];

const Dashboard = () => {
  const { completedTopics, recentTopic } = useProgress();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const progressPercentage = Math.round((completedTopics.length / topics.length) * 100) || 0;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card flex-1 p-8 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border-accent-primary/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary mb-4">
              Welcome back to AlgoLabs
            </h1>
            <p className="text-secondary text-lg mb-6 max-w-lg">
              Continue your journey to master Data Structures and Algorithms with interactive visualizations and AI-assisted learning.
            </p>
            {recentTopic ? (
               <Link to={`/topic/${recentTopic}`} className="inline-flex items-center gap-2 bg-accent-primary text-white px-6 py-3 rounded-xl font-medium shadow-neon-glow hover:opacity-90 transition-all">
                 <PlayCircle className="w-5 h-5" /> 
                 Continue {topics.find(t=>t.id===recentTopic)?.name || 'Learning'}
               </Link>
            ) : (
               <Link to="/topic/arrays" className="inline-flex items-center gap-2 bg-accent-primary text-white px-6 py-3 rounded-xl font-medium shadow-neon-glow hover:opacity-90 transition-all">
                 <PlayCircle className="w-5 h-5" /> Start Learning
               </Link>
            )}
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card w-full md:w-80 p-6 rounded-2xl flex flex-col justify-center"
        >
          <h3 className="font-semibold text-text-primary mb-2 flex items-center justify-between">
            Course Progress
            <span className="text-accent-primary">{progressPercentage}%</span>
          </h3>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-accent-primary to-accent-secondary h-full rounded-full"
            />
          </div>
          <p className="text-sm text-secondary">
            You've completed {completedTopics.length} out of {topics.length} modules.
          </p>
        </motion.div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-text-primary">Learning Modules</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {topics.map(topic => (
            <motion.div key={topic.id} variants={item}>
              <Link to={topic.path} className="glass-card p-6 rounded-xl flex flex-col gap-4 hover:-translate-y-1 hover:border-accent-primary/50 hover:shadow-lg transition-all border border-border group block">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-lg bg-black/5 dark:bg-white/5 ${topic.color}`}>
                    <topic.icon className="w-6 h-6" />
                  </div>
                  {completedTopics.includes(topic.id) && (
                    <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Done</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">{topic.name}</h3>
                  <p className="text-sm text-secondary mt-1">{topic.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="pb-10">
        <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-2">
          <Clock className="w-6 h-6 text-accent-secondary" /> Recent Activity
        </h2>
        <div className="glass-card p-6 rounded-xl border border-border">
          {recentTopic ? (
             <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-accent-secondary animate-pulse" />
                <p className="text-text-primary">You were recently exploring <span className="font-semibold text-accent-primary">{topics.find(t=>t.id===recentTopic)?.name}</span>. Don't stop now!</p>
             </div>
          ) : (
            <p className="text-secondary text-center py-4">No recent activity. Start exploring a module!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
