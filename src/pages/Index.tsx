
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import MainSidebar from '@/components/layout/Sidebar';
import WelcomeMessage from '@/components/dashboard/WelcomeMessage';
import QuickMetrics from '@/components/dashboard/QuickMetrics';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import CallToAction from '@/components/dashboard/CallToAction';
import TaskItem from '@/components/ui/TaskItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample upcoming tasks
const upcomingTasks = [
  {
    id: '1',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: 'Today, 5:00 PM',
    duration: '2 hours',
    completed: false,
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Math Problem Set',
    subject: 'Math',
    dueDate: 'Tomorrow',
    duration: '1.5 hours',
    completed: false,
    priority: 'medium' as const,
  },
  {
    id: '3',
    title: 'CS Project',
    subject: 'CS',
    dueDate: 'Friday',
    duration: '3 hours',
    completed: false,
    priority: 'medium' as const,
  },
];

const Index = () => {
  const [tasks, setTasks] = React.useState(upcomingTasks);

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add animation to container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6 max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <WelcomeMessage />
              
              <QuickMetrics />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ActivityFeed />
                </div>
                <div className="md:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border shadow-sm h-full">
                      <CardHeader className="pb-3">
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Your priority tasks</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          {tasks.map((task) => (
                            <TaskItem
                              key={task.id}
                              id={task.id}
                              title={task.title}
                              subject={task.subject}
                              dueDate={task.dueDate}
                              completed={task.completed}
                              priority={task.priority}
                              onToggle={toggleTaskCompletion}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
              
              <CallToAction />
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
