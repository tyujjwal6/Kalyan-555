// src/components/Sidebar.jsx (Updated)

import React from 'react';
import { NavLink } from 'react-router-dom';
// Updated icon imports for consistency
import { Home, UserCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// A reusable link component using NavLink for active styling
const SidebarLink = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center w-full text-left p-3 rounded-md transition-colors",
        "hover:bg-gray-800",
        isActive
          ? "text-white font-bold bg-gray-700/50"
          : "text-gray-400 font-medium"
      )
    }
  >
    {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
    {children}
  </NavLink>
);

// The Sidebar now accepts an `isOpen` prop
const Sidebar = ({ isOpen }) => {
  // Original links, with cleaner labels
  const gameManagementLinks = [
    { to: "/game-name", label: "Game Name" },
    { to: "/game-rates", label: "Game Rates" },
    { to: "/bid-history", label: "Bid History" },
    { to: "/declare-result-gm", label: "Declare Result" },
    { to: "/result-history", label: "Result History" },
    { to: "/game-sell-report", label: "Sell Report" },
    { to: "/game-winning-report", label: "Winning Report" },
    { to: "/game-winning-prediction", label: "Winning Prediction" },
  ];

  // New links based on the image for 'Gali Disswar'
  const galiDisswarLinks = [
    { to: "/game-name-2", label: "Game Name" },
    { to: "/game-rates-2", label: "Game Rates" },
    { to: "/bid-history2", label: "Bid History" },
    { to: "/declare-result-2", label: "Declare Result" }, // Corrected typo from image
    { to: "/result-history-2", label: "Result History" },
    { to: "/sell-report", label: "Sell Report" },
    { to: "/winning-report", label: "Winning Report" },
    { to: "/winning-prediction", label: "Winning Prediction" },
  ];
  
  // *** UPDATED: New links for 'Report Management' based on the image ***
  const reportManagementLinks = [
     { to: "/user-bid-history", label: "Users Bid History" },
     { to: "/customer-sell-report", label: "Customer Sell Report" },
     { to: "/winning-report", label: "Winning Report" }, // Added -rm to path to avoid conflicts
     { to: "/transfer-point-report", label: "Transfer Point Report" },
     { to: "/bid-win-report", label: "Bid Win Report" },
     { to: "/withdraw-report", label: "Withdraw Report" },
     { to: "/auto-deposit-history", label: "Auto Deposit History" },
  ];


  return (
    // Use the `isOpen` prop to conditionally apply classes for showing/hiding
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-black text-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-bold tracking-wider text-white no-underline transition-opacity hover:opacity-80"
        >
          KALYAN 555
        </a>
      </div>
      
      {/* Navigation Links Area */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          <SidebarLink to="/" icon={Home}>Dashboards</SidebarLink>
          <SidebarLink to="/declare-result" icon={UserCheck}>Declare Result</SidebarLink>

          <Accordion type="single" collapsible defaultValue="gali-disswar" className="w-full">
            {/* Kept original 'Game Management' but updated icon */}
            <AccordionItem value="game-management" className="border-none">
              <AccordionTrigger className="p-3 text-gray-400 hover:text-white hover:no-underline rounded-md hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center">
                  <UserCheck className="mr-3 h-5 w-5" />
                  <span className="font-semibold text-base">Game Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-1 pb-1">
                {gameManagementLinks.map((link) => (
                  <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            {/* Added new 'Gali Disswar' accordion from the image */}
            <AccordionItem value="gali-disswar" className="border-none">
              <AccordionTrigger className="p-3 text-gray-400 hover:text-white hover:no-underline rounded-md hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center">
                  <UserCheck className="mr-3 h-5 w-5" />
                  <span className="font-semibold text-base">Gali Disswar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-1 pb-1">
                {galiDisswarLinks.map((link) => (
                  <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Added new 'Report Management' accordion from the image */}
            <AccordionItem value="report-management" className="border-none">
              <AccordionTrigger className="p-3 text-gray-400 hover:text-white hover:no-underline rounded-md hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center">
                  <UserCheck className="mr-3 h-5 w-5" />
                  <span className="font-semibold text-base">Report Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-1 pb-1">
                {reportManagementLinks.map((link) => (
                  <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;