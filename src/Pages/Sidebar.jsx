import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Home, UserCheck, ChevronDown, Target } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Make sure you have this utility from shadcn/ui setup


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
    {Icon && <Icon className="mr-3 h-5 w-5" />}
    {children}
  </NavLink>
);

const Sidebar = () => {
  // Define navigation items for the accordion
  const gameManagementLinks = [
    { to: "/game-name", label: "Game Name" },
    { to: "/game-rates", label: "Game Rates" },
    { to: "/bid-history", label: "Bid History" },
    { to: "/declare-result-gm", label: "Declare Result" }, // Using a different path to avoid conflict
    { to: "/result-history", label: "Result History" },
    { to: "/game-sell-report", label: "Game Sell report" },
    { to: "/game-winning-report", label: "Game Winning report" },
    { to: "/game-winning-prediction", label: "Game Winning Prediction" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-black p-4 text-white">
      <div className="flex-1 space-y-2">
        {/* Top-level links */}
        <SidebarLink to="/" icon={Home}>Dashboards</SidebarLink>
        <SidebarLink to="/declare-result" icon={UserCheck}>Declare Result</SidebarLink>

        {/* Accordion for Game Management */}
        <Accordion type="single" collapsible defaultValue="game-management" className="w-full">
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
        </Accordion>
        
        {/* Another example link (partially visible in screenshot) */}
        <SidebarLink to="/winning-prediction" icon={Target}>
            Winning Prediction
        </SidebarLink>

      </div>
    </div>
  );
};

export default Sidebar;