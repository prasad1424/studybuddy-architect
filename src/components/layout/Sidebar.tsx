
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, MessageSquare, BarChart, User, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarTrigger 
} from '@/components/ui/sidebar';

const SidebarItem = ({ icon: Icon, label, to, className, ...props }: {
  icon: React.ElementType;
  label: string;
  to: string;
  className?: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent",
          className
        )
      }
      {...props}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

const MainSidebar = () => {
  return (
    <Sidebar className="border-r animate-fade-in">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md size-8 bg-study-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">S</span>
          </div>
          <span className="font-display font-semibold">StudyBuddy</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6 px-3 py-2">
            <div className="space-y-1">
              <SidebarItem to="/" icon={Home} label="Dashboard" />
              <SidebarItem to="/planner" icon={Calendar} label="Study Planner" />
              <SidebarItem to="/feedback" icon={MessageSquare} label="Feedback" />
              <SidebarItem to="/analytics" icon={BarChart} label="Analytics" />
              <SidebarItem to="/profile" icon={User} label="Profile" />
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground mx-3 my-2">Support</p>
              <SidebarItem to="/settings" icon={Settings} label="Settings" />
              <SidebarItem to="/help" icon={HelpCircle} label="Help & Resources" />
            </div>
            
            <Separator />
            
            <div className="px-3 py-2">
              <div className="rounded-lg bg-sidebar-accent/70 p-3">
                <h4 className="text-sm font-semibold mb-2">Need Assistance?</h4>
                <p className="text-xs text-muted-foreground mb-3">Schedule a meeting with a study advisor to enhance your learning.</p>
                <Button size="sm" className="w-full bg-study-primary hover:bg-study-primary/90">
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © 2023 StudyBuddy
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
