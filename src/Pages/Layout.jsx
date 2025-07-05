// src/components/layout/Layout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    // Best practice: Default state is false to prevent flicker on mobile load.
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    // This effect correctly checks the screen size and sets the sidebar state.
    useEffect(() => {
        const checkScreenSize = () => {
            // This line correctly defines "mobile" as any screen less than 450px wide.
            const mobile = window.innerWidth < 450; 
            setIsMobile(mobile);

            // If the screen is NOT mobile (>= 450px), open the sidebar.
            if (!mobile) {
                setSidebarOpen(true);
            } else {
            // If the screen IS mobile (< 450px), ensure the sidebar is closed.
                setSidebarOpen(false);
            }
        };

        // Run the check when the component mounts
        checkScreenSize();

        // Add an event listener to re-check when the window is resized
        window.addEventListener('resize', checkScreenSize);

        // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []); // Empty dependency array means this runs only on mount and unmount.

    // This effect handles closing the sidebar by clicking the overlay.
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebarElement = document.querySelector('[data-sidebar]');
            if (isMobile && isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isSidebarOpen]);

    // Function to toggle the sidebar, passed to the Header component.
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex min-h-screen bg-gray-100 dark:bg-gray-800">
            {/* 
              The Sidebar component receives the isOpen state.
              The data-sidebar attribute is used for the click-outside logic.
            */}
            <Sidebar isOpen={isSidebarOpen} data-sidebar />

            {/* Overlay for mobile when sidebar is open */}
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content Area */}
            <div
                // --- FIXED: Added backticks (`) to make this a valid template literal ---
                className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
                    // This logic correctly pushes the content only on non-mobile screens when the sidebar is open
                    isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
                }`}
            >
                <Header onMenuClick={toggleSidebar} />

                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;