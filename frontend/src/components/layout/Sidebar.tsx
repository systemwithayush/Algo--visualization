import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, Network, ListTree, Database, Share2, Layers, Binary, Search, Users, ShieldAlert, MonitorPlay, Workflow } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Arrays', icon: Code2, path: '/topic/arrays' },
    { name: 'Linked List', icon: Network, path: '/topic/linked-list' },
    { name: 'Stacks & Queues', icon: Layers, path: '/topic/stack-queue' },
    { name: 'Sorting', icon: Binary, path: '/topic/sorting' },
    { name: 'Searching', icon: Search, path: '/topic/searching' },
    { name: 'Trees', icon: ListTree, path: '/topic/trees' },
    { name: 'Graphs', icon: Share2, path: '/topic/graphs' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card hidden md:flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <Database className="w-6 h-6" />
          <span>AlgoLabs</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-3">Playgrounds</div>
        <NavLink to="/playground/web" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary dark:text-gray-400'}`}>
          <MonitorPlay className="w-5 h-5" />
          Web Syntax Mode
        </NavLink>
        <NavLink to="/playground/dsa" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary dark:text-gray-400'}`}>
          <Workflow className="w-5 h-5" />
          Algorithm Mode
        </NavLink>
        
        <div className="mt-6 text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-3">Learning Modules</div>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary dark:text-gray-400'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
        
        <div className="mt-8 text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-3">Community</div>
        <NavLink to="/developers" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary dark:text-gray-400'}`}>
          <Users className="w-5 h-5" />
          Developers
        </NavLink>
        <NavLink to="/admin/feedback" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary dark:text-gray-400'}`}>
          <ShieldAlert className="w-5 h-5" />
          Admin view
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
