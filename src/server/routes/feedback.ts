
import express from 'express';
import db from '../config/db';
import { io } from '../index';

const router = express.Router();

// Get all feedback for a student
router.get('/received', async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Only students can view feedback they've received
    if (userRole !== 'student') {
      return res.status(403).json({ message: 'Unauthorized: Only students can view received feedback' });
    }
    
    const result = await db.query(
      `SELECT f.*, u.name as author_name, u.role as author_role 
       FROM feedback f
       JOIN users u ON f.author_id = u.id
       WHERE f.student_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all feedback given by a mentor/parent
router.get('/given', async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Only mentors/parents can view feedback they've given
    if (userRole !== 'mentor' && userRole !== 'parent') {
      return res.status(403).json({ message: 'Unauthorized: Only mentors or parents can view given feedback' });
    }
    
    const result = await db.query(
      `SELECT f.*, u.name as student_name 
       FROM feedback f
       JOIN users u ON f.student_id = u.id
       WHERE f.author_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit new feedback
router.post('/', async (req, res) => {
  try {
    const authorId = req.user.id;
    const authorRole = req.user.role;
    const { student_id, message, type } = req.body;
    
    // Only mentors/parents can submit feedback
    if (authorRole !== 'mentor' && authorRole !== 'parent') {
      return res.status(403).json({ message: 'Unauthorized: Only mentors or parents can submit feedback' });
    }
    
    // Check if student exists
    const studentCheck = await db.query('SELECT id FROM users WHERE id = $1 AND role = $2', [student_id, 'student']);
    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const result = await db.query(
      'INSERT INTO feedback (author_id, student_id, message, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [authorId, student_id, message, type || 'suggestion']
    );
    
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: result.rows[0]
    });
    
    // Notify student through WebSocket
    io.to(`user-${student_id}`).emit('new-feedback', {
      message: 'You have received new feedback',
      feedbackId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark feedback as helpful/read
router.patch('/:feedbackId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { feedbackId } = req.params;
    const { helpful } = req.body;
    
    // Verify that this feedback was for this student
    const feedbackCheck = await db.query('SELECT id FROM feedback WHERE id = $1 AND student_id = $2', [feedbackId, userId]);
    if (feedbackCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Feedback not found or not authorized' });
    }
    
    const result = await db.query(
      'UPDATE feedback SET helpful = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [helpful, feedbackId]
    );
    
    res.json({
      message: 'Feedback updated successfully',
      feedback: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
