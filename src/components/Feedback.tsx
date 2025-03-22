
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  ThumbsUp, 
  Calendar, 
  Send,
  Sparkles,
  LightbulbIcon
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample feedback data
const feedbackData = [
  {
    id: '1',
    author: 'Prof. Johnson',
    avatar: '',
    authorInitials: 'PJ',
    role: 'Mentor',
    date: '2 days ago',
    message: 'Great progress on your calculus assignments! I\'ve noticed significant improvement in your approach to integration techniques. Keep focusing on the practical applications as you move forward.',
    type: 'positive',
  },
  {
    id: '2',
    author: 'Dr. Williams',
    avatar: '',
    authorInitials: 'DW',
    role: 'Academic Advisor',
    date: '1 week ago',
    message: 'Your study plan is well-structured, but I suggest allocating more time to physics problem-solving. Try to incorporate more practice problems to strengthen your conceptual understanding.',
    type: 'suggestion',
  },
  {
    id: '3',
    author: 'Sarah Chen',
    avatar: '',
    authorInitials: 'SC',
    role: 'Study Group Leader',
    date: '2 weeks ago',
    message: 'You\'ve been very consistent with the group study sessions! Your explanations of complex topics have helped everyone. Consider taking the lead on the next group project.',
    type: 'positive',
  },
];

const FeedbackItem = ({ feedback }: { feedback: typeof feedbackData[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border p-4",
        feedback.type === 'positive' ? 'bg-green-50 border-green-100' : 
        feedback.type === 'suggestion' ? 'bg-amber-50 border-amber-100' : 
        'bg-card border-border'
      )}
    >
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={feedback.avatar} alt={feedback.author} />
          <AvatarFallback className={
            feedback.type === 'positive' ? 'bg-green-100 text-green-700' :
            feedback.type === 'suggestion' ? 'bg-amber-100 text-amber-700' :
            'bg-study-primary text-white'
          }>
            {feedback.authorInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{feedback.author}</span>
              <Badge variant="outline" className="text-xs">{feedback.role}</Badge>
            </div>
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {feedback.date}
            </span>
          </div>
          
          <p className="mt-2 text-sm">{feedback.message}</p>
          
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>Helpful</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeedbackRecommendation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-study-light to-blue-50 rounded-lg border border-study-primary/20 p-4"
    >
      <div className="flex gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-study-primary/20 text-study-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        
        <div>
          <h4 className="text-sm font-medium flex items-center">
            <LightbulbIcon className="h-4 w-4 mr-1 text-amber-500" />
            Based on recent feedback
          </h4>
          <p className="mt-1 text-sm">Consider forming a study group for your physics class to work through problem sets together. This can improve your conceptual understanding and problem-solving skills.</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="h-8 text-xs bg-study-primary hover:bg-study-primary/90">
              Create Study Group
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Find Existing Groups
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Feedback = () => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 space-y-6"
      >
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Feedback & Insights</CardTitle>
            <CardDescription>Guidance from your mentors and instructors</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {feedbackData.map((feedback) => (
              <FeedbackItem key={feedback.id} feedback={feedback} />
            ))}
          </CardContent>
          
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Feedback
            </Button>
          </CardFooter>
        </Card>
        
        <FeedbackRecommendation />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-1"
      >
        <Card className="border shadow-sm h-full">
          <CardHeader>
            <CardTitle>Request Feedback</CardTitle>
            <CardDescription>Ask for guidance from your mentors</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Select Recipient</label>
              <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer bg-study-primary hover:bg-study-primary/90">
                  Prof. Johnson
                </Badge>
                <Badge className="cursor-pointer" variant="outline">
                  Dr. Williams
                </Badge>
                <Badge className="cursor-pointer" variant="outline">
                  Academic Advisor
                </Badge>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Topic</label>
              <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer bg-study-primary hover:bg-study-primary/90">
                  Study Plan
                </Badge>
                <Badge className="cursor-pointer" variant="outline">
                  Assignment
                </Badge>
                <Badge className="cursor-pointer" variant="outline">
                  Project
                </Badge>
                <Badge className="cursor-pointer" variant="outline">
                  Career Advice
                </Badge>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Your Message</label>
              <Textarea 
                placeholder="I would like feedback on my recent calculus assignment, particularly on the integration methods..." 
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button className="bg-study-primary hover:bg-study-primary/90">
              <Send className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Feedback;
