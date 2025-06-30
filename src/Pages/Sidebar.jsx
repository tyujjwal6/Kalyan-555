import React from 'react';
import { NavLink } from 'react-router-dom';
// Using consistent icons from lucide-react
import { Home, UserCheck, Gamepad2, ClipboardList, Settings } from 'lucide-react'; // Added ClipboardList & Settings
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

// The Sidebar component
const Sidebar = ({ isOpen }) => {
  // Existing link data definitions are kept as requested
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
{ to: "/game-name-2", label: "Game Name" },
{ to: "/game-rates-2", label: "Game Rates" },
{ to: "/bid-history-2", label: "Bid History" },
{ to: "/declare-result-2", label: "Declare Result" },
{ to: "/result-history-2", label: "Result History" },
{ to: "/sell-report", label: "Sell Report" },
{ to: "/winning-report", label: "Winning Report" },
{ to: "/winning-prediction", label: "Winning Prediction" },
];
  
  const reportManagementLinks = [
     { to: "/user-bid-history", label: "Users Bid History" },
     { to: "/customer-sell-report", label: "Customer Sell Report" },
     { to: "/winning-report", label: "Winning Report" },
     { to: "/transfer-point-report", label: "Transfer Point Report" },
     { to: "/bid-win-report", label: "Bid Win Report" },
     { to: "/withdraw-report", label: "Withdraw Report" },
     { to: "/auto-deposit-history", label: "Auto Deposit History" },
  ];

  const walletManagementLinks = [
    { to: "/fund-request", label: "Fund Request" },
    { to: "/withdraw-request", label: "Withdraw Request" },
    { to: "/amount-added-by-admin", label: "Amount Added By Admin" },
    { to: "/add-fund-user-wallet", label: "Add Fund (User Wallet)" },
    { to: "/bid-revert", label: "Bid Revert" },
    { to: "/autopay-transaction", label: "Autopay Transaction" },
  ];

  const gamesManagementLinks = [
    { to: "game-name-3", label: "Game Name" },
    { to: "game-rates-3", label: "Game Rates" },
  ];

  const gameAndNumbersLinks = [
    { to: "/single-digit", label: "Single Digit" },
    { to: "/jodi-digit", label: "Jodi Digit" },
    { to: "/single-pana", label: "Single Pana" },
    { to: "/double-pana", label: "Double Pana" },
    { to: "/tripple-pana", label: "Tripple Pana" },
    { to: "/half-sangam", label: "Half Sangam" },
    { to: "/full-sangam", label: "Full Sangam" },
  ];

  const noticeManagementLinks = [
    { to: "/notice-management", label: "Notice Management" },
    { to: "/send-notification", label: "Send Notification" },
  ];
  
  // *** NEW: Data for the Settings links ***
  const settingsLinks = [
    { to: "/main-settings", label: "Main Settings" },
    { to: "/contact-settings", label: "Contact Settings" },
    { to: "/clear-data", label: "Clear Data" },
    { to: "/slider-images", label: "Slider Images" },
    { to: "/qr-code-images", label: "QR code Images" },
    { to: "/how-to-play", label: "How To Play" },
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
                    {gameManagementLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="gali-disswar" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Gali Disswar</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {galiDisswarLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="report-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Report Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {reportManagementLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SidebarLink to="/winning-prediction" icon={UserCheck}>Winning Prediction</SidebarLink>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="wallet-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Wallet Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {walletManagementLinks.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <SidebarLink to="/user-management" icon={UserCheck}>User Management</SidebarLink>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="games-management" className="border-none">
                <SidebarAccordionTrigger icon={Gamepad2}>Games Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {gamesManagementLinks.map((link) => (
                      <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="game-and-numbers" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Game & Numbers</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {gameAndNumbersLinks.map((link) => (
                      <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notice-management" className="border-none">
                <SidebarAccordionTrigger icon={UserCheck}>Notice Management</SidebarAccordionTrigger>
                <AccordionContent className="pl-6 space-y-1 pb-1">
                    {noticeManagementLinks.map((link) => (
                      <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SidebarLink to="/user-query" icon={ClipboardList}>Users Query</SidebarLink>
          
          {/* *** START: ADDED SETTINGS SECTION *** */}
          <Accordion type="single" collapsible className="w-full" defaultValue="settings">
            <AccordionItem value="settings" className="border-none">
              <SidebarAccordionTrigger icon={Settings}>Settings</SidebarAccordionTrigger>
              <AccordionContent className="pl-6 space-y-1 pb-1">
                {settingsLinks.map((link) => (
                  <SidebarLink key={link.to} to={link.to}>{link.label}</SidebarLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* *** END: ADDED SETTINGS SECTION *** */}

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;