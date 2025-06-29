// src/components/Layout.jsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header'; // Correctly importing ONE header
import Sidebar from './Sidebar';

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="relative flex min-h-screen bg-gray-100 dark:bg-gray-800">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
  
        {/* Main Content Area */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* 
            MAKE SURE YOU ONLY HAVE ONE <Header /> INSTANCE HERE.
            Remove any other header components from this file.
          */}
          <Header onMenuClick={toggleSidebar} />
          
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
};

export default Layout;