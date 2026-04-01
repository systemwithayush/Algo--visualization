import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8787/api/feedback')
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full h-full p-2">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-accent-primary" />
        <h1 className="text-3xl font-bold text-text-primary">Admin Feedback View</h1>
      </div>

      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
           <div className="flex items-center justify-center p-12 text-secondary">
             <Loader2 className="w-8 h-8 animate-spin" />
           </div>
        ) : feedbacks.length === 0 ? (
           <div className="p-12 text-center text-secondary">
             No feedback submitted yet!
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-secondary text-sm uppercase tracking-wider">
                  <th className="p-4 border-b border-border font-semibold">Topic</th>
                  <th className="p-4 border-b border-border font-semibold">Name</th>
                  <th className="p-4 border-b border-border font-semibold">Rating</th>
                  <th className="p-4 border-b border-border font-semibold">Feedback</th>
                  <th className="p-4 border-b border-border font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {feedbacks.map((f, i) => (
                  <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 text-text-primary font-medium whitespace-nowrap">{f.topic}</td>
                    <td className="p-4 text-secondary whitespace-nowrap">{f.name || 'Anonymous'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${f.rating >= 4 ? 'bg-green-500/20 text-green-500' : f.rating === 3 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                        {f.rating} / 5
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-primary max-w-md">
                      <p className="mb-1">{f.feedback}</p>
                      {f.suggestion && <p className="text-xs text-accent-secondary mt-1 border-t border-border border-dashed pt-1"><span className="font-semibold">Idea:</span> {f.suggestion}</p>}
                    </td>
                    <td className="p-4 text-sm text-secondary whitespace-nowrap">
                      {new Date(f.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
