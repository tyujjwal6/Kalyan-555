// src/components/Sidebar.jsx (Updated)

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UserCheck, Settings, Target } from 'lucide-react';
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
  const gameManagementLinks = [
    { to: "/game-name", label: "Game Name" },
    { to: "/game-rates", label: "Game Rates" },
    { to: "/bid-history", label: "Bid History" },
    { to: "/declare-result-gm", label: "Declare Result" },
    { to: "/result-history", label: "Result History" },
    { to: "/game-sell-report", label: "Game Sell report" },
    { to: "/game-winning-report", label: "Game Winning report" },
    { to: "/game-winning-prediction", label: "Game Winning Prediction" },
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

          <Accordion type="single" collapsible defaultValue="game-management" className="w-full">
            <AccordionItem value="game-management" className="border-none">
              <AccordionTrigger className="p-3 text-gray-400 hover:text-white hover:no-underline rounded-md hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  <span className="font-semibold text-base">Game Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-1 pb-1">
                {gameManagementLinks.map((link) => (
                  <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <SidebarLink to="/winning-prediction" icon={Target}>
              Winning Prediction
          </SidebarLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;