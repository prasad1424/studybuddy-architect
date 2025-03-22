
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import TaskItem from '@/components/ui/TaskItem';
import { cn } from '@/lib/utils';

// Sample study tasks data
const sampleTasks = [
  {
    id: '1',
    title: 'Calculus Chapter 4 Problems',
    subject: 'Math',
    dueDate: 'Today, 5:00 PM',
    duration: '2 hours',
    completed: false,
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: 'Tomorrow',
    duration: '3 hours',
    completed: false,
    priority: 'medium' as const,
  },
  {
    id: '3',
    title: 'Literature Essay Outline',
    subject: 'English',
    dueDate: 'Thursday',
    duration: '1.5 hours',
    completed: false,
    priority: 'medium' as const,
  },
  {
    id: '4',
    title: 'Chemistry Formulas Review',
    subject: 'Chemistry',
    dueDate: 'Friday',
    duration: '1 hour',
    completed: true,
    priority: 'low' as const,
  },
];

const StudyPlanner = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState(sampleTasks);

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Format the selected date for display
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 lg:w-2/5"
        >
          <Card className="border shadow-sm h-full">
            <CardHeader>
              <CardTitle>Study Calendar</CardTitle>
              <CardDescription>Select a date to view or plan your study sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Selected: <span className="font-medium ml-1">{formatDate(date)}</span>
              </div>
              <Button size="sm" className="bg-study-primary hover:bg-study-primary/90">
                <Plus className="mr-1 h-4 w-4" /> Add Session
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:w-1/2 lg:w-3/5"
        >
          <Card className="border shadow-sm h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Study Tasks</CardTitle>
                  <CardDescription>
                    Your scheduled tasks for {formatDate(date)}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                    duration={task.duration}
                    completed={task.completed}
                    priority={task.priority}
                    onToggle={toggleTaskCompletion}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Total: <span className="font-medium ml-1">7.5 hours</span>
              </div>
              <Button variant="outline" size="sm">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyPlanner;
