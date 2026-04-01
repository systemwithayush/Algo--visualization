import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import GenAIAssistant from '../ai/GenAIAssistant';

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <GenAIAssistant />
    </div>
  );
};

export default AppLayout;
