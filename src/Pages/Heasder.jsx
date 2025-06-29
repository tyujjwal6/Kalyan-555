import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Maximize, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ onMenuClick }) => {

  // Dummy function to toggle fullscreen mode
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      console.log("Entering fullscreen mode.");
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      console.log("Exiting fullscreen mode.");
    }
  };

  // Dummy function to simulate a logout API call
  const handleLogout = () => {
    console.log("User logout initiated...");
    alert("Dummy API Call: User has been logged out.");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      {/* Left side of the header */}
      <div className="flex items-center gap-4">
      <img
          src="/admin-logo.png"
          alt="Admin Logo"
          className="h-30 w-auto"
        />
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>
        <Link to="/" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
          Home
        </Link>
      </div>

      {/* Right side of the header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleFullscreen}>
          <Maximize className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full p-1 h-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150" alt="User Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;