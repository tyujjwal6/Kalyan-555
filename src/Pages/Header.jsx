import React from 'react';
// Import Link for declarative navigation and useNavigate for programmatic navigation
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Maximize, User, Settings, LogOut, ChevronDown, KeyRound } from 'lucide-react';
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
  // Get the navigate function from React Router for programmatic redirects
  const navigate = useNavigate();

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  /**
   * Handles user logout.
   * In a real app, this would also clear authentication tokens/session state.
   * After that, it redirects the user to the login page.
   */
  const handleLogout = () => {
    console.log("User logout initiated...");
    // In a real app, you would clear the user's session/token here.
    
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* --- FIXED: Removed "lg:hidden" class to make the button always visible --- */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} >
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>
        <Link to="/" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
          Home
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Hide fullscreen button on mobile */}
        <Button variant="ghost" size="icon" onClick={handleFullscreen} className="hidden sm:inline-flex">
          <Maximize className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 rounded-full p-1 h-auto focus-visible:ring-0">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarImage src="https://i.pravatar.cc/150" alt="User Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:inline-block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to="/user-management">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/main-settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/forgot-password">
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
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