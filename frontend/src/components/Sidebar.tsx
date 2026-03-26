import React from 'react';
import { LayoutDashboard, List, BarChart2, Search, TreeDeciduous, Share2, Code, Terminal, Zap } from 'lucide-react';

const Sidebar = ({ onNavigate, activeId }: { onNavigate: (mode: string) => void, activeId: string }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, id: 'dashboard' },
    { name: 'Data Structures', icon: <List size={20} />, id: 'ds' },
    { name: 'Sorting', icon: <BarChart2 size={20} />, id: 'sorting' },
    { name: 'Searching', icon: <Search size={20} />, id: 'searching' },
    { name: 'Trees', icon: <TreeDeciduous size={20} />, id: 'trees' },
    { name: 'Graphs', icon: <Share2 size={20} />, id: 'graphs' },
    { name: 'Code Sandbox', icon: <Code size={20} />, id: 'sandbox' },
    { name: 'Performance', icon: <Zap size={20} />, id: 'performance' },
  ];

  return (
    <aside className="sidebar glass-card">
      <div className="logo-container">
        <Terminal className="logo-icon" size={24} />
        <span className="logo-text">AlgoLabs</span>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div 
            key={item.name} 
            className={`nav-item ${activeId === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
