
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WelcomeMessage = () => {
  // Get current time to determine greeting
  const currentHour = new Date().getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-study-primary/10 to-study-accent/10 rounded-2xl p-6 border border-study-primary/20 shadow-sm backdrop-blur-xs"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-study-dark">
            {getGreeting()}, Jordan
          </h2>
          <p className="text-muted-foreground mt-1">
            You have 3 tasks scheduled for today. Your focus time is 3:00 PM.
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-study-primary hover:bg-study-primary/90">
          <span>Update Study Plan</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-study-primary/10"
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">This Week</div>
          <div className="mt-1 text-2xl font-semibold">16 hrs</div>
          <div className="text-sm text-muted-foreground">Study time</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-study-primary/10"
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Completed</div>
          <div className="mt-1 text-2xl font-semibold">12 tasks</div>
          <div className="text-sm text-muted-foreground">Last 7 days</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-study-primary/10"
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Focus Score</div>
          <div className="mt-1 text-2xl font-semibold">87%</div>
          <div className="text-sm text-muted-foreground">High consistency</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeMessage;
