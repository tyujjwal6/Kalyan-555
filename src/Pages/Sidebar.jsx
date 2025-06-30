import React from 'react';
import { NavLink } from 'react-router-dom';
// Using consistent icons from lucide-react
import { Home, UserCheck, Gamepad2 } from 'lucide-react';
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
        isSubLink && "py-2 pl-6"
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

// The Sidebar component
const Sidebar = ({ isOpen }) => {
  // Existing link data definitions are kept as requested
  const gameManagementLinks = [/* ...links... */];
  const galiDisswarLinks = [/* ...links... */];
  const reportManagementLinks = [/* ...links... */];
  const walletManagementLinks = [/* ...links... */];

  // Corrected paths for better routing
  const gamesManagementLinks = [
    { to: "/games-management/game-name", label: "Game Name" },
    { to: "/games-management/game-rates", label: "Game Rates" },
  ];

  return (
    <aside
      className={cn(
        // Base styles for the sidebar
        "fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-black text-white transition-transform duration-300 ease-in-out",
        // Mobile view: slide in/out based on the isOpen prop
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop view: always visible
        "lg:translate-x-0"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
        <span className="text-xl font-bold tracking-wider text-white">KALYAN 555</span>
      </div>
      
      {/* Navigation Links Area */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          <SidebarLink to="/" icon={Home}>Dashboards</SidebarLink>
          <SidebarLink to="/declare-result" icon={UserCheck}>Declare Result</SidebarLink>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="game-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Game Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {/* Your links here */}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="gali-disswar" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Gali Disswar</SidebarAccordionTrigger>
                 <AccordionContent className="pl-6 space-y-1 pb-1">
                    {/* Your links here */}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="report-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Report Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {/* Your links here */}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SidebarLink to="/winning-prediction" icon={UserCheck}>Winning Prediction</SidebarLink>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="wallet-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Wallet Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {/* Your links here */}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <SidebarLink to="/user-management" icon={UserCheck}>User Management</SidebarLink>

          {/* Games Management Accordion (open by default) */}
          <Accordion type="single" collapsible defaultValue="games-management" className="w-full">
            <AccordionItem value="games-management" className="border-none">
                <SidebarAccordionTrigger icon={Gamepad2}>Games Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {gamesManagementLinks.map((link) => (
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