
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Sample data
const weeklyData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 1.2 },
  { name: 'Thu', hours: 4.5 },
  { name: 'Fri', hours: 3.2 },
  { name: 'Sat', hours: 5.0 },
  { name: 'Sun', hours: 2.1 },
];

const monthlyData = [
  { name: 'Week 1', hours: 18.5, tasks: 12 },
  { name: 'Week 2', hours: 22.3, tasks: 15 },
  { name: 'Week 3', hours: 17.8, tasks: 10 },
  { name: 'Week 4', hours: 24.5, tasks: 18 },
];

const subjectData = [
  { name: 'Math', hours: 12.5, color: '#2C7A7B' },
  { name: 'Science', hours: 8.3, color: '#38B2AC' },
  { name: 'History', hours: 6.7, color: '#285E61' },
  { name: 'Language', hours: 5.2, color: '#4FD1C5' },
  { name: 'Arts', hours: 3.8, color: '#81E6D9' },
];

interface ChartProps {
  type: 'area' | 'bar' | 'line';
  data: any[];
  dataKey: string;
  stroke?: string;
  fill?: string;
  className?: string;
  height?: number;
  xAxisDataKey?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  customizedCells?: boolean;
}

const ProgressChart = ({
  type,
  data,
  dataKey,
  stroke = '#2C7A7B',
  fill = 'rgba(56, 178, 172, 0.2)',
  className,
  height = 200,
  xAxisDataKey = 'name',
  showGrid = true,
  showTooltip = true,
  customizedCells = false,
}: ChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "w-full rounded-xl p-1",
        className
      )}
    >
      <ResponsiveContainer width="100%" height={height}>
        {type === 'area' ? (
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            {showTooltip && <Tooltip />}
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={stroke} 
              fill={fill} 
              strokeWidth={2}
            />
          </AreaChart>
        ) : type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            {showTooltip && <Tooltip />}
            <Bar 
              dataKey={dataKey} 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            >
              {customizedCells && data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || stroke} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
            />
            {showTooltip && <Tooltip />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={stroke} 
              strokeWidth={2}
              dot={{ fill: stroke, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
};

// Export data for use in other components
export { weeklyData, monthlyData, subjectData };

export default ProgressChart;
