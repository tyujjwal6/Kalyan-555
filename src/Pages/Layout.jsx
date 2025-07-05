// src/components/Layout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    // --- CHANGE 1: Set initial state to `false` ---
    // This ensures the sidebar is closed by default on mobile view.
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    // --- CHANGE 2: Add hooks to auto-close sidebar on navigation/resize ---
    const location = useLocation();

    useEffect(() => {
      // This function handles closing the sidebar when the screen is small.
      const handleResizeOrNavigate = () => {
        if (window.innerWidth < 1024) { // 1024px is the 'lg' breakpoint
          setSidebarOpen(false);
        }
      };
      
      // Close sidebar on navigation (i.e., when the URL changes)
      handleResizeOrNavigate();
      
      // Add a listener for window resize events
      window.addEventListener('resize', handleResizeOrNavigate);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResizeOrNavigate);
    }, [location]); // Re-run this effect when location changes


    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
        {/* Sidebar component now correctly uses the `isOpen` prop for mobile */}
        <Sidebar isOpen={isSidebarOpen} />
  
        {/* 
          --- CHANGE 3: Main Content Area Responsive Margin ---
          The margin is now handled by responsive Tailwind classes, not JavaScript.
          It has NO margin on small screens and a left margin on large screens (`lg:`)
          to make space for the static sidebar.
        */}
        <div className="flex flex-1 flex-col lg:ml-64">

          <Header onMenuClick={toggleSidebar} />
          
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
};

export default Layout;