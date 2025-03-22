
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, BookOpen, BrainCircuit, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

type MetricProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  delay?: number;
};

const MetricCard = ({ title, value, change, icon: Icon, trend, delay = 0 }: MetricProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={cn(
          "size-10 rounded-full flex items-center justify-center",
          trend === 'up' ? "bg-green-100" : trend === 'down' ? "bg-red-100" : "bg-study-light"
        )}>
          <Icon className={cn(
            "size-5",
            trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-study-primary"
          )} />
        </div>
      </div>
      
      <div className="mt-3 flex items-center">
        <span className={cn(
          "text-xs font-medium flex items-center",
          trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-muted-foreground"
        )}>
          <ArrowUpRight className={cn(
            "mr-1 h-3 w-3",
            trend === 'down' && "rotate-90"
          )} />
          {change}
        </span>
        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
      </div>
    </motion.div>
  );
};

const QuickMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Study Hours"
        value="24.5"
        change="+12%"
        icon={Clock}
        trend="up"
        delay={0.1}
      />
      <MetricCard
        title="Topics Covered"
        value="16"
        change="+4"
        icon={BookOpen}
        trend="up"
        delay={0.2}
      />
      <MetricCard
        title="Focus Score"
        value="87%"
        change="-3%"
        icon={BrainCircuit}
        trend="down"
        delay={0.3}
      />
      <MetricCard
        title="Milestones"
        value="8"
        change="Same"
        icon={Award}
        trend="neutral"
        delay={0.4}
      />
    </div>
  );
};

export default QuickMetrics;
