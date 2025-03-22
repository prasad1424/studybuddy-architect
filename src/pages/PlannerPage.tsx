
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import MainSidebar from '@/components/layout/Sidebar';
import StudyPlanner from '@/components/StudyPlanner';

const PlannerPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6 max-w-7xl">
            <StudyPlanner />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PlannerPage;
