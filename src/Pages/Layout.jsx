import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* The Outlet component will render the matched route's component */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;