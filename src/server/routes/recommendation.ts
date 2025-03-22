
import express from 'express';
import db from '../config/db';
import { io } from '../index';
import axios from 'axios';

const router = express.Router();

// Get AI-powered study recommendations for a student
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get recent recommendations from the database
    const result = await db.query(
      'SELECT * FROM recommendations WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate new AI recommendations
router.post('/generate', async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's study data
    const userDataQuery = await db.query(
      `SELECT 
        u.study_preferences,
        (SELECT json_agg(sp.*) FROM study_plans sp WHERE sp.user_id = $1) as plans,
        (SELECT json_agg(st.*) FROM study_tasks st 
          JOIN study_plans sp ON st.plan_id = sp.id 
          WHERE sp.user_id = $1) as tasks,
        (SELECT json_agg(f.*) FROM feedback f WHERE f.student_id = $1) as feedback
      FROM users u WHERE u.id = $1`,
      [userId]
    );
    
    if (userDataQuery.rows.length === 0) {
      return res.status(404).json({ message: 'User data not found' });
    }
    
    const userData = userDataQuery.rows[0];
    
    // Call external AI service or implement simple recommendation logic
    // For this example, we'll create a simplified algorithm without external API
    // In a real implementation, you would call an AI service like OpenAI
    
    // Simple recommendation generation logic
    let recommendationText = generateRecommendation(userData);
    
    // Store recommendation in database
    const insertResult = await db.query(
      'INSERT INTO recommendations (user_id, content, source) VALUES ($1, $2, $3) RETURNING *',
      [userId, recommendationText, 'internal-algorithm']
    );
    
    res.status(201).json({
      message: 'Recommendation generated successfully',
      recommendation: insertResult.rows[0]
    });
    
    // Notify through WebSocket
    io.to(`user-${userId}`).emit('new-recommendation', {
      message: 'New study recommendation available',
      recommendationId: insertResult.rows[0].id
    });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Simple recommendation generator function
function generateRecommendation(userData: any) {
  // This is a placeholder for a real AI recommendation system
  // In a production app, you would use a trained model or call an AI API
  
  const recommendations = [
    "Based on your recent study patterns, we recommend focusing more on Mathematics.",
    "We noticed you perform better with morning study sessions. Try allocating more difficult tasks in the morning.",
    "Your productivity increases when you take short breaks every 25 minutes. Consider using the Pomodoro technique.",
    "You have completed several Science tasks recently. Consider balancing your study with some Humanities subjects.",
    "Based on your feedback, we suggest forming a study group for your Physics class."
  ];
  
  // Analyze completed vs pending tasks
  let completedTasks = 0;
  let pendingTasks = 0;
  
  if (userData.tasks) {
    userData.tasks.forEach((task: any) => {
      if (task.completed) {
        completedTasks++;
      } else {
        pendingTasks++;
      }
    });
  }
  
  // Simple logic to pick a recommendation
  let recommendationIndex = 0;
  
  if (pendingTasks > 10) {
    recommendationIndex = 2; // Recommend time management techniques
  } else if (userData.feedback && userData.feedback.length > 0) {
    recommendationIndex = 4; // Recommend something based on feedback
  } else if (completedTasks > pendingTasks) {
    recommendationIndex = 3; // Recommend subject balancing
  } else {
    recommendationIndex = Math.floor(Math.random() * recommendations.length);
  }
  
  return recommendations[recommendationIndex];
}

export default router;
