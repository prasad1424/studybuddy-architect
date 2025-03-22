
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Book, 
  Bookmark, 
  Calendar,
  BookOpen,
  Clock,
  Pencil,
  School
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-1"
      >
        <Card className="border shadow-sm h-full">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-2 border-study-primary">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="text-lg bg-study-primary text-white">JS</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl">Jordan Smith</CardTitle>
            <CardDescription className="text-muted-foreground">Computer Science Student</CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-study-primary hover:bg-study-primary/90">Junior Year</Badge>
              <Badge variant="outline">GPA: 3.8</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-study-light text-study-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">jordan.smith@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-study-light text-study-primary">
                  <School className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">University</p>
                  <p className="font-medium">Stanford University</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-study-light text-study-primary">
                  <Book className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Major</p>
                  <p className="font-medium">Computer Science</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-study-light text-study-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">September 2021</p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full bg-study-primary hover:bg-study-primary/90">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2 space-y-6"
      >
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Study Preferences</CardTitle>
            <CardDescription>Your personalized study settings</CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Preferred Study Times</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-study-primary" />
                    Morning (6 AM - 12 PM)
                  </span>
                  <Progress value={80} className="h-2 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-study-primary" />
                    Afternoon (12 PM - 6 PM)
                  </span>
                  <Progress value={60} className="h-2 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-study-primary" />
                    Evening (6 PM - 12 AM)
                  </span>
                  <Progress value={40} className="h-2 w-24" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Learning Style</h4>
              <div className="space-y-2">
                <Badge className="mr-2 bg-study-primary hover:bg-study-primary/90">Visual</Badge>
                <Badge className="mr-2 bg-study-secondary hover:bg-study-secondary/90">Hands-on</Badge>
                <Badge variant="outline">Reading/Writing</Badge>
              </div>
              
              <h4 className="text-sm font-semibold mt-4">Study Environment</h4>
              <div className="space-y-2">
                <Badge className="mr-2 bg-study-primary hover:bg-study-primary/90">Quiet</Badge>
                <Badge variant="outline">Background Music</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Academic Goals</CardTitle>
            <CardDescription>Your current progress toward academic goals</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-study-primary" />
                  <span className="font-medium">Complete Advanced Algorithms Course</span>
                </div>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-study-primary" />
                  <span className="font-medium">Research Project: AI Ethics</span>
                </div>
                <span className="text-sm text-muted-foreground">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-study-primary" />
                  <span className="font-medium">Prepare for Graduate School Applications</span>
                </div>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Goal
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
