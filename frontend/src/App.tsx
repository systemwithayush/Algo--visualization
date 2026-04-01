import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Developers from './pages/Developers';
import AdminFeedback from './pages/AdminFeedback';
import PlaygroundWeb from './pages/PlaygroundWeb';
import PlaygroundDSA from './pages/PlaygroundDSA';

// We will build these individually
import ArraysDetails from './pages/topics/ArraysDetails';
import SortingDetails from './pages/topics/SortingDetails';
import SearchingDetails from './pages/topics/SearchingDetails';
import LinkedListsDetails from './pages/topics/LinkedListsDetails';
import StacksQueuesDetails from './pages/topics/StacksQueuesDetails';
import TreesDetails from './pages/topics/TreesDetails';
import GraphsDetails from './pages/topics/GraphsDetails';
import HTMLDetails from './pages/topics/HTMLDetails';
import CSSDetails from './pages/topics/CSSDetails';
import JSDetails from './pages/topics/JSDetails';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        
        {/* Structured Course Topics */}
        <Route path="/topic/arrays" element={<ArraysDetails />} />
        <Route path="/topic/sorting" element={<SortingDetails />} />
        <Route path="/topic/searching" element={<SearchingDetails />} />
        <Route path="/topic/linked-list" element={<LinkedListsDetails />} />
        <Route path="/topic/stack-queue" element={<StacksQueuesDetails />} />
        <Route path="/topic/trees" element={<TreesDetails />} />
        <Route path="/topic/graphs" element={<GraphsDetails />} />

        {/* Web Development Topics */}
        <Route path="/topic/html" element={<HTMLDetails />} />
        <Route path="/topic/css" element={<CSSDetails />} />
        <Route path="/topic/js" element={<JSDetails />} />

        {/* Global Pages */}
        <Route path="/developers" element={<Developers />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        
        {/* Playgrounds */}
        <Route path="/playground/web" element={<PlaygroundWeb />} />
        <Route path="/playground/dsa" element={<PlaygroundDSA />} />
      </Route>
    </Routes>
  );
}

export default App;
