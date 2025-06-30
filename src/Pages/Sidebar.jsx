import React from 'react';
import { NavLink } from 'react-router-dom';
// Using consistent icons from lucide-react
import { Home, UserCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// A reusable link component using NavLink for active styling
const SidebarLink = ({ to, icon: Icon, children, isSubLink = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center w-full text-left p-3 rounded-md transition-colors",
        "hover:bg-gray-800",
        isActive
          ? "text-white font-bold bg-gray-700/50"
          : "text-gray-400 font-medium",
        isSubLink && "py-2 pl-6" // Specific styling for sub-links
      )
    }
  >
    {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
    {children}
  </NavLink>
);

// A reusable Accordion Trigger component for clean code
const SidebarAccordionTrigger = ({ icon: Icon, children }) => (
    <AccordionTrigger className="p-3 text-gray-400 hover:text-white hover:no-underline rounded-md hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-white [&[data-state=open]]:font-bold">
        <div className="flex items-center">
        <Icon className="mr-3 h-5 w-5" />
        <span className="font-semibold text-base">{children}</span>
        </div>
    </AccordionTrigger>
);

// The Sidebar now accepts an `isOpen` prop
const Sidebar = ({ isOpen }) => {
  // Link data organized by section
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

  const galiDisswarLinks = [
    { to: "/gali-game-name", label: "Game Name" },
    { to: "/gali-game-rates", label: "Game Rates" },
    { to: "/gali-bid-history", label: "Bid History" },
    { to: "/gali-declare-result", label: "Declare Result" },
    { to: "/gali-result-history", label: "Result History" },
    { to: "/gali-sell-report", label: "Sell Report" },
    { to: "/gali-winning-report", label: "Winning Report" },
    { to: "/gali-winning-prediction", label: "Winning Prediction" },
  ];
  
  const reportManagementLinks = [
     { to: "/user-bid-history", label: "Users Bid History" },
     { to: "/customer-sell-report", label: "Customer Sell Report" },
     { to: "/winning-report-rm", label: "Winning Report" },
     { to: "/transfer-point-report", label: "Transfer Point Report" },
     { to: "/bid-win-report", label: "Bid Win Report" },
     { to: "/withdraw-report", label: "Withdraw Report" },
     { to: "/auto-deposit-history", label: "Auto Deposit History" },
  ];

  // *** UPDATED: New links for 'Wallet Management' based on the image ***
  const walletManagementLinks = [
    { to: "/fund-request", label: "Fund Request" },
    { to: "/withdraw-request", label: "Withdraw Request" },
    { to: "/amount-added-by-admin", label: "Amount Added By Admin" },
    { to: "/add-fund", label: "Add Fund (User Wallet)" },
    { to: "/bid-revert", label: "Bid Revert" },
    { to: "/autopay-transaction", label: "Autopay Transaction" },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-black text-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
        {/* Placeholder for a logo or title */}
        <span className="text-xl font-bold tracking-wider text-white">Admin Panel</span>
      </div>
      
      {/* Navigation Links Area */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          <SidebarLink to="/" icon={Home}>Dashboards</SidebarLink>
          <SidebarLink to="/declare-result" icon={UserCheck}>Declare Result</SidebarLink>

          {/* Accordion parent with default open state set to Wallet Management */}
          <Accordion type="single" collapsible defaultValue="wallet-management" className="w-full">
            
            <AccordionItem value="game-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Game Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {gameManagementLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="gali-disswar" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Gali Disswar</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {galiDisswarLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="report-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Report Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {reportManagementLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* *** UPDATED: Winning Prediction as a single link *** */}
          <SidebarLink to="/winning-prediction" icon={UserCheck}>Winning Prediction</SidebarLink>

          {/* *** UPDATED: Wallet Management as an accordion *** */}
          <Accordion type="single" collapsible defaultValue="wallet-management" className="w-full">
            <AccordionItem value="wallet-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Wallet Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {walletManagementLinks.map((link) => (
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