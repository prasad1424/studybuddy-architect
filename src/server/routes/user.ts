
import express from 'express';
import db from '../config/db';

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'SELECT id, name, email, role, university, major, join_date FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, university, major, study_preferences } = req.body;
    
    // Update user details
    const result = await db.query(
      'UPDATE users SET name = $1, university = $2, major = $3, study_preferences = $4, updated_at = NOW() WHERE id = $5 RETURNING id, name, email, university, major, study_preferences',
      [name, university, major, study_preferences, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's academic goals
router.get('/goals', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'SELECT * FROM academic_goals WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new academic goal
router.post('/goals', async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, target_date, progress } = req.body;
    
    const result = await db.query(
      'INSERT INTO academic_goals (user_id, title, description, target_date, progress) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, title, description, target_date, progress || 0]
    );
    
    res.status(201).json({
      message: 'Goal created successfully',
      goal: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an academic goal
router.put('/goals/:goalId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalId } = req.params;
    const { title, description, target_date, progress } = req.body;
    
    const result = await db.query(
      'UPDATE academic_goals SET title = $1, description = $2, target_date = $3, progress = $4, updated_at = NOW() WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, target_date, progress, goalId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Goal not found or not authorized' });
    }
    
    res.json({
      message: 'Goal updated successfully',
      goal: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
