import React, { useState } from 'react';
import { Share2, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedbackFormProps {
  topicId: string;
}

const FeedbackForm = ({ topicId }: FeedbackFormProps) => {
  const [formData, setFormData] = useState({ name: '', feedback: '', suggestion: '', rating: 5 });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.feedback) return;
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:8787/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicId, ...formData })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', feedback: '', suggestion: '', rating: 5 });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl max-w-2xl mx-auto my-12 border border-border">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-text-primary">
        <MessageSquare className="w-5 h-5 text-accent-primary" />
        Share Your Feedback
      </h3>
      <p className="text-secondary mb-6 text-sm">Help us improve the {topicId} module. What did you like? What can we do better?</p>

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 text-green-500 p-4 rounded-xl flex items-center gap-3">
          <ThumbsUp className="w-5 h-5" /> Thank you for your feedback!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Name (Optional)</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border text-text-primary rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-primary transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Rating</label>
              <select value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-background border border-border text-text-primary rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-primary transition-colors">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Feedback *</label>
            <textarea required value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} className="w-full h-24 bg-background border border-border text-text-primary rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-primary transition-colors resize-none" placeholder="The visualization was clear but..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Suggestions for Improvement</label>
            <input type="text" value={formData.suggestion} onChange={e => setFormData({...formData, suggestion: e.target.value})} className="w-full bg-background border border-border text-text-primary rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-primary transition-colors" placeholder="Maybe add a slow speed button..." />
          </div>
          <div className="flex justify-end mt-2">
            <button type="submit" disabled={status === 'loading' || !formData.feedback} className="bg-accent-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-neon-glow disabled:opacity-50">
              {status === 'loading' ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Feedback</>}
            </button>
          </div>
          {status === 'error' && <p className="text-red-500 text-sm mt-2">Failed to submit feedback. Ensure backend is running.</p>}
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
