import React from 'react';
import {
  BarChart2, Search, TreeDeciduous, Share2, Code, Zap,
  List, ArrowRight, BookOpen, Star, Clock, TrendingUp,
  Layers, GitBranch, Activity
} from 'lucide-react';

interface Props {
  onNavigate: (mode: string, sub?: string) => void;
}

const topics = [
  {
    id: 'sorting',
    label: 'Sorting Algorithms',
    icon: <BarChart2 size={28} />,
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.35)',
    desc: 'Bubble, Merge, Quick, Heap Sort & more',
    count: '8 Algorithms',
    badge: 'Popular',
  },
  {
    id: 'searching',
    label: 'Searching',
    icon: <Search size={28} />,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    desc: 'Linear & Binary Search with step-by-step tracing',
    count: '4 Algorithms',
    badge: 'Beginner',
  },
  {
    id: 'ds',
    label: 'Data Structures',
    icon: <List size={28} />,
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.35)',
    desc: 'Arrays, Linked Lists, Stacks & Queues',
    count: '3 Types',
    badge: 'Core',
  },
  {
    id: 'trees',
    label: 'Trees',
    icon: <TreeDeciduous size={28} />,
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.35)',
    desc: 'BST insertion, deletion & traversal',
    count: '3 Traversals',
    badge: 'Intermediate',
  },
  {
    id: 'graphs',
    label: 'Graphs',
    icon: <Share2 size={28} />,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    desc: 'BFS, DFS, shortest path algorithms',
    count: '5 Algorithms',
    badge: 'Advanced',
  },
  {
    id: 'sandbox',
    label: 'Code Sandbox',
    icon: <Code size={28} />,
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.35)',
    desc: 'Write & run custom algorithms in-browser',
    count: 'Open-ended',
    badge: 'Creative',
  },
  {
    id: 'performance',
    label: 'Benchmarks',
    icon: <Zap size={28} />,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.35)',
    desc: 'Compare time & space complexities visually',
    count: 'All Algos',
    badge: 'Analytics',
  },
];

const stats = [
  { label: 'Algorithms Covered', value: '20+', icon: <Activity size={20} />, color: '#6366f1' },
  { label: 'Visualizer Modules', value: '7', icon: <Layers size={20} />, color: '#a855f7' },
  { label: 'Data Structures', value: '6', icon: <GitBranch size={20} />, color: '#22d3ee' },
  { label: 'Learning Paths', value: '3', icon: <BookOpen size={20} />, color: '#22c55e' },
];

const recentActivity = [
  { name: 'Bubble Sort Visualization', time: '2 mins ago', status: 'Completed', icon: <BarChart2 size={14} /> },
  { name: 'Binary Search Implementation', time: '1 hour ago', status: 'In Progress', icon: <Search size={14} /> },
  { name: 'Linked List Traversal', time: '3 hours ago', status: 'Completed', icon: <List size={14} /> },
  { name: 'BST Insertion', time: 'Yesterday', status: 'Completed', icon: <TreeDeciduous size={14} /> },
];

const badgeColor = (badge: string) => {
  const map: Record<string, string> = {
    Popular: '#6366f1',
    Beginner: '#22c55e',
    Core: '#22d3ee',
    Intermediate: '#f59e0b',
    Advanced: '#f43f5e',
    Creative: '#a855f7',
    Analytics: '#fb923c',
  };
  return map[badge] || '#6366f1';
};

const HomeDashboard: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="hd-root">
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="hd-hero glass-card">
        <div className="hd-hero-text">
          <span className="hd-hero-eyebrow">
            <Star size={13} style={{ color: '#f59e0b' }} /> Interactive DSA Learning Lab
          </span>
          <h1 className="hd-hero-title">
            Master Algorithms<br />
            <span className="hd-gradient-text">Visually</span>
          </h1>
          <p className="hd-hero-sub">
            Step-by-step animations, complexity analysis and a live code sandbox — all in one place.
          </p>
          <div className="hd-hero-actions">
            <button className="hd-btn-primary" onClick={() => onNavigate('sorting')}>
              Start Learning <ArrowRight size={16} />
            </button>
            <button className="hd-btn-ghost" onClick={() => onNavigate('performance')}>
              View Benchmarks
            </button>
          </div>
        </div>
        <div className="hd-hero-art" aria-hidden="true">
          <div className="hd-bars">
            {[40, 70, 30, 90, 55, 75, 20, 60, 85, 45].map((h, i) => (
              <div
                key={i}
                className="hd-bar"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, #6366f1 0%, #a855f7 100%)`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat Strip ──────────────────────────────────────────────── */}
      <div className="hd-stats">
        {stats.map((s) => (
          <div key={s.label} className="hd-stat glass-card">
            <div className="hd-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>
              {s.icon}
            </div>
            <div>
              <p className="hd-stat-val">{s.value}</p>
              <p className="hd-stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Topic Grid ──────────────────────────────────────────────── */}
      <div className="hd-section-header">
        <h2>Explore Topics</h2>
        <span className="hd-section-tag"><TrendingUp size={13} /> All Modules</span>
      </div>
      <div className="hd-topic-grid">
        {topics.map((t) => (
          <button
            key={t.id}
            className="hd-topic-card glass-card"
            style={{ '--card-glow': t.glow, '--card-color': t.color } as React.CSSProperties}
            onClick={() => onNavigate(t.id)}
          >
            <div className="hd-topic-top">
              <div className="hd-topic-icon" style={{ color: t.color, background: `${t.color}18` }}>
                {t.icon}
              </div>
              <span className="hd-topic-badge" style={{ background: `${badgeColor(t.badge)}22`, color: badgeColor(t.badge) }}>
                {t.badge}
              </span>
            </div>
            <h3 className="hd-topic-name">{t.label}</h3>
            <p className="hd-topic-desc">{t.desc}</p>
            <div className="hd-topic-footer">
              <span className="hd-topic-count"><Clock size={12} /> {t.count}</span>
              <span className="hd-topic-arrow"><ArrowRight size={14} /></span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Bottom Row: Recent + Quick Actions ──────────────────────── */}
      <div className="hd-bottom">
        <div className="hd-recent glass-card">
          <h3 className="hd-panel-title">Recent Activity</h3>
          <div className="hd-activity-list">
            {recentActivity.map((a, i) => (
              <div key={i} className="hd-activity-item">
                <div className="hd-activity-dot" style={{ background: a.status === 'Completed' ? '#22c55e' : '#f59e0b' }} />
                <div className="hd-activity-icon">{a.icon}</div>
                <div className="hd-activity-info">
                  <span className="hd-activity-name">{a.name}</span>
                  <span className="hd-activity-time">{a.time}</span>
                </div>
                <span className="hd-activity-status" style={{ color: a.status === 'Completed' ? '#22c55e' : '#f59e0b' }}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hd-quick glass-card">
          <h3 className="hd-panel-title">Quick Jump</h3>
          <div className="hd-quick-grid">
            {[
              { label: 'Open Sandbox', id: 'sandbox', icon: <Code size={16} />, color: '#f43f5e' },
              { label: 'Benchmarks', id: 'performance', icon: <Zap size={16} />, color: '#fb923c' },
              { label: 'Graphs', id: 'graphs', icon: <Share2 size={16} />, color: '#f59e0b' },
              { label: 'Trees', id: 'trees', icon: <TreeDeciduous size={16} />, color: '#22c55e' },
            ].map((q) => (
              <button
                key={q.id}
                className="hd-quick-btn glass-card"
                style={{ '--qb-color': q.color } as React.CSSProperties}
                onClick={() => onNavigate(q.id)}
              >
                <span style={{ color: q.color }}>{q.icon}</span>
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
