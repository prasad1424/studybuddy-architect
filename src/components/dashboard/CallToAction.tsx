
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-study-primary to-study-secondary rounded-xl p-6 text-white shadow-lg"
    >
      <div className="max-w-md space-y-4">
        <h3 className="text-xl font-display font-semibold">Ready to optimize your study routine?</h3>
        <p className="text-white/90 text-sm">
          Get personalized recommendations based on your study habits and preferences. Our AI will help you create the most efficient study plan.
        </p>
        <div className="pt-2">
          <Button variant="secondary" className="group">
            <span>Get Recommendations</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CallToAction;
