
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, BookOpen, MessageSquare, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'complete' | 'schedule' | 'topic' | 'feedback' | 'milestone';
};

const activities: ActivityItem[] = [
  {
    id: 1,
    title: 'Completed Practice Problems',
    description: 'Calculus: Integration by Parts',
    time: '2 hours ago',
    type: 'complete'
  },
  {
    id: 2,
    title: 'Added New Study Session',
    description: 'Physics: Quantum Mechanics',
    time: '4 hours ago',
    type: 'schedule'
  },
  {
    id: 3,
    title: 'Started New Topic',
    description: 'Chemistry: Organic Compounds',
    time: 'Yesterday',
    type: 'topic'
  },
  {
    id: 4,
    title: 'Received Feedback',
    description: 'From Prof. Johnson on your essay',
    time: 'Yesterday',
    type: 'feedback'
  },
  {
    id: 5,
    title: 'Achieved Milestone',
    description: '10-day study streak!',
    time: '2 days ago',
    type: 'milestone'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'complete':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'schedule':
      return <Calendar className="h-5 w-5 text-study-primary" />;
    case 'topic':
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case 'feedback':
      return <MessageSquare className="h-5 w-5 text-amber-500" />;
    case 'milestone':
      return <BadgeCheck className="h-5 w-5 text-purple-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const ActivityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-border shadow-sm overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="px-6 py-4 flex items-start gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="px-6 py-3 bg-muted/30 border-t border-border">
        <button className="text-study-primary text-sm font-medium hover:underline">
          View all activity
        </button>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
