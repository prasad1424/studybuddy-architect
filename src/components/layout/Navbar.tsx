
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  
  // Determine page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/planner':
        return 'Study Planner';
      case '/profile':
        return 'Profile';
      case '/feedback':
        return 'Feedback';
      case '/analytics':
        return 'Analytics';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border sticky top-0">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-display font-semibold tracking-tight text-study-primary animate-fade-in">
              StudyBuddy
            </h1>
          </div>
          <div className="md:hidden">
            <h1 className="text-xl font-display font-semibold tracking-tight text-study-primary animate-fade-in">
              SB
            </h1>
          </div>
          <div className="hidden md:block h-6 w-px bg-border mx-2" />
          <span className="text-lg font-medium text-foreground">{getPageTitle()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-study-accent rounded-full" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-study-primary text-white">JS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-slide-in-right">
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
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
