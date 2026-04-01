import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GenAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: 'Hi there! I am your DSA learning assistant. Feel free to ask me to explain any algorithm or trace a logic block.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Points to Cloudflare Worker API
      const res = await fetch('http://localhost:8787/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: `Error: ${data.error || 'Failed to reach AI'}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error: Cannot connect to backend API currently.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-accent-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 glass-card shadow-2xl flex flex-col overflow-hidden z-50 border border-border"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            <div className="bg-primary p-4 text-white flex justify-between items-center h-14 bg-accent-primary">
              <div className="flex items-center gap-2 font-semibold">
                <Bot className="w-5 h-5" /> AI Assistant
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-card">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user' ? 'bg-accent-primary text-white rounded-br-none' : 'bg-black/5 dark:bg-white/10 text-text-primary rounded-bl-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-black/5 dark:bg-white/10 rounded-2xl rounded-bl-none px-4 py-2 text-sm max-w-[85%] text-text-primary">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-background border border-border text-text-primary rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
                <button 
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-accent-primary text-white p-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GenAIAssistant;
