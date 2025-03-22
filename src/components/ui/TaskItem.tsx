
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  id: string;
  title: string;
  subject?: string;
  dueDate?: string;
  duration?: string;
  completed?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  className?: string;
  priority?: 'low' | 'medium' | 'high';
}

const TaskItem = ({
  id,
  title,
  subject,
  dueDate,
  duration,
  completed = false,
  onToggle,
  className,
  priority = 'medium',
}: TaskItemProps) => {
  const handleToggle = () => {
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors",
        completed && "bg-muted/40",
        className
      )}
    >
      <div className="pt-0.5">
        <Checkbox checked={completed} onCheckedChange={handleToggle} id={`task-${id}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <label 
            htmlFor={`task-${id}`}
            className={cn(
              "text-base font-medium cursor-pointer",
              completed && "text-muted-foreground line-through"
            )}
          >
            {title}
          </label>
          
          {subject && (
            <span 
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                priority === 'high' ? "bg-red-100 text-red-800" :
                priority === 'medium' ? "bg-amber-100 text-amber-800" :
                "bg-green-100 text-green-800"
              )}
            >
              {subject}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-1">
          {dueDate && (
            <span className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {dueDate}
            </span>
          )}
          
          {duration && (
            <span className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </span>
          )}
        </div>
      </div>
      
      {completed && (
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
          <Check className="h-3.5 w-3.5 text-green-600" />
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;
