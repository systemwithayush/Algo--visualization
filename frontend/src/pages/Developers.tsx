import React from 'react';

const Developers = () => {
  return (
    <div className="max-w-4xl mx-auto w-full h-full p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Meet the Developers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-card p-8 rounded-2xl text-center border border-border hover:border-accent-primary/50 transition-colors">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">D</div>
          <h2 className="text-2xl font-bold text-text-primary">Divya Rao</h2>
          <p className="text-secondary mb-4">Backend & Cloudflare</p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/Divss72" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/divya-rao-975a3b32a/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">LinkedIn</a>
            <a href="mailto:divyarao2403@gmail.com" className="text-emerald-500 hover:underline">Email</a>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl text-center border border-border hover:border-accent-primary/50 transition-colors">
          <div className="w-24 h-24 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">A</div>
          <h2 className="text-2xl font-bold text-text-primary">Ayush Kumar</h2>
          <p className="text-secondary mb-4">Frontend & Algorithms</p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/systemwithayush" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/ayush-kumar-3542a7352/" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline">LinkedIn</a>
            <a href="mailto:ayushbarun88@gmail.com" className="text-accent-primary hover:underline">Email</a>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-border">
        <h2 className="text-2xl font-bold mb-4">Open Contribution</h2>
        <p className="text-secondary mb-6 leading-relaxed">
          Help improve this platform! AlgoLabs is fully open-source. Whether you want to add a new visualization, fix a bug, or write better theory explanations, we welcome all pull requests.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/systemwithayush/Algo--visualization" target="_blank" rel="noreferrer" className="bg-accent-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90">
            View on GitHub
          </a>
          <a href="https://github.com/systemwithayush/Algo--visualization/issues/new" target="_blank" rel="noreferrer" className="bg-card text-text-primary border border-border px-6 py-3 rounded-xl font-medium hover:bg-black/5 dark:hover:bg-white/5">
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developers;
