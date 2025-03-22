
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import MainSidebar from '@/components/layout/Sidebar';
import Analytics from '@/components/Analytics';

const AnalyticsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6 max-w-7xl">
            <Analytics />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AnalyticsPage;
