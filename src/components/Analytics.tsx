
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Clock, 
  BookOpen, 
  Award, 
  BarChart2, 
  TrendingUp,
  Calendar,
  PieChart,
  ArrowDownAZ
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import MetricCard from '@/components/ui/MetricCard';
import ProgressChart, { weeklyData, monthlyData, subjectData } from '@/components/ui/ProgressChart';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          title="Total Study Hours"
          value="24.5"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: "8%", positive: true }}
        />
        <MetricCard
          title="Topics Covered"
          value="16"
          icon={<BookOpen className="h-5 w-5" />}
          trend={{ value: "4", positive: true }}
        />
        <MetricCard
          title="Completed Tasks"
          value="32"
          icon={<Award className="h-5 w-5" />}
          trend={{ value: "10%", positive: true }}
        />
        <MetricCard
          title="Focus Score"
          value="87%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: "3%", positive: false }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-study-primary" />
                  Study Progress
                </CardTitle>
                <CardDescription>Track your study habits and progress over time</CardDescription>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {timeRange === 'week' ? 'This Week' : 
                       timeRange === 'month' ? 'This Month' : 'This Year'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTimeRange('week')}>
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange('month')}>
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange('year')}>
                    This Year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="hours" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="hours">Study Hours</TabsTrigger>
                <TabsTrigger value="tasks">Completed Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hours" className="space-y-4">
                <ProgressChart 
                  type="area" 
                  data={timeRange === 'week' ? weeklyData : monthlyData}
                  dataKey="hours"
                  stroke="#2C7A7B"
                  fill="rgba(56, 178, 172, 0.2)"
                  height={250}
                />
              </TabsContent>
              
              <TabsContent value="tasks" className="space-y-4">
                <ProgressChart 
                  type="bar" 
                  data={timeRange === 'week' ? weeklyData : monthlyData} 
                  dataKey="tasks"
                  stroke="#2C7A7B"
                  height={250}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-study-primary" />
                Study Distribution
              </CardTitle>
              <CardDescription>Breakdown of time spent on each subject</CardDescription>
            </CardHeader>
            
            <CardContent>
              <ProgressChart 
                type="bar" 
                data={subjectData} 
                dataKey="hours"
                stroke="#2C7A7B"
                customizedCells={true}
                height={280}
              />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowDownAZ className="h-5 w-5 mr-2 text-study-primary" />
                Performance by Subject
              </CardTitle>
              <CardDescription>Grades and performance metrics for each subject</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#2C7A7B] mr-2"></div>
                      <span className="font-medium">Mathematics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">A-</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2C7A7B] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#38B2AC] mr-2"></div>
                      <span className="font-medium">Physics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">B+</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-[#38B2AC] h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#285E61] mr-2"></div>
                      <span className="font-medium">Computer Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">A</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-[#285E61] h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#4FD1C5] mr-2"></div>
                      <span className="font-medium">Chemistry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">B</span>
                      <ArrowUpRight className="h-4 w-4 text-amber-500 rotate-90" />
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4FD1C5] h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#81E6D9] mr-2"></div>
                      <span className="font-medium">English</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">A-</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-[#81E6D9] h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
