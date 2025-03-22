
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    positive?: boolean;
  };
  className?: string;
  valueClassName?: string;
  children?: React.ReactNode;
}

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  className,
  valueClassName,
  children,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-card backdrop-blur-sm rounded-xl p-5 border border-border shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-study-primary">{icon}</div>}
      </div>
      
      <div className={cn("mt-2 text-2xl font-semibold", valueClassName)}>
        {value}
      </div>
      
      {trend && (
        <div className="mt-1 flex items-center text-xs">
          <span
            className={cn(
              "font-medium",
              trend.positive ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        </div>
      )}
      
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
};

export default MetricCard;
