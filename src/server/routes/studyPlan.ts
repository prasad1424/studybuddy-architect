
import express, { Request, Response } from 'express';
import db from '../config/db';
import { io } from '../index';

const router = express.Router();

// Get all study plans for a user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    const result = await db.query(
      'SELECT * FROM study_plans WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching study plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single study plan by ID
router.get('/:planId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId } = req.params;
    
    const result = await db.query(
      'SELECT * FROM study_plans WHERE id = $1 AND user_id = $2',
      [planId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    // Get tasks associated with this plan
    const tasksResult = await db.query(
      'SELECT * FROM study_tasks WHERE plan_id = $1 ORDER BY due_date ASC',
      [planId]
    );
    
    const plan = {
      ...result.rows[0],
      tasks: tasksResult.rows
    };
    
    res.json(plan);
  } catch (error) {
    console.error('Error fetching study plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new study plan
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { title, description, start_date, end_date, subjects } = req.body;
    
    const result = await db.query(
      'INSERT INTO study_plans (user_id, title, description, start_date, end_date, subjects) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, description, start_date, end_date, subjects]
    );
    
    res.status(201).json({
      message: 'Study plan created successfully',
      plan: result.rows[0]
    });
    
    // Notify through WebSocket
    io.to(`user-${userId}`).emit('study-plan-created', {
      message: 'New study plan created',
      planId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error creating study plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a study plan
router.put('/:planId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId } = req.params;
    const { title, description, start_date, end_date, subjects } = req.body;
    
    const result = await db.query(
      'UPDATE study_plans SET title = $1, description = $2, start_date = $3, end_date = $4, subjects = $5, updated_at = NOW() WHERE id = $6 AND user_id = $7 RETURNING *',
      [title, description, start_date, end_date, subjects, planId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    res.json({
      message: 'Study plan updated successfully',
      plan: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating study plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a study plan
router.delete('/:planId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId } = req.params;
    
    // First delete associated tasks
    await db.query('DELETE FROM study_tasks WHERE plan_id = $1', [planId]);
    
    // Then delete the plan
    const result = await db.query(
      'DELETE FROM study_plans WHERE id = $1 AND user_id = $2 RETURNING id',
      [planId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    res.json({
      message: 'Study plan deleted successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error deleting study plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks for a study plan
router.get('/:planId/tasks', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId } = req.params;
    
    // First check if the plan belongs to this user
    const planCheck = await db.query(
      'SELECT id FROM study_plans WHERE id = $1 AND user_id = $2',
      [planId, userId]
    );
    
    if (planCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    const result = await db.query(
      'SELECT * FROM study_tasks WHERE plan_id = $1 ORDER BY due_date ASC',
      [planId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new task for a study plan
router.post('/:planId/tasks', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId } = req.params;
    const { title, subject, due_date, duration, priority } = req.body;
    
    // Check if plan belongs to user
    const planCheck = await db.query(
      'SELECT id FROM study_plans WHERE id = $1 AND user_id = $2',
      [planId, userId]
    );
    
    if (planCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    const result = await db.query(
      'INSERT INTO study_tasks (plan_id, title, subject, due_date, duration, priority, completed) VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING *',
      [planId, title, subject, due_date, duration, priority || 'medium']
    );
    
    res.status(201).json({
      message: 'Task created successfully',
      task: result.rows[0]
    });
    
    // Notify through WebSocket
    io.to(`user-${userId}`).emit('task-created', {
      message: 'New task created',
      planId,
      taskId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task completion status
router.patch('/:planId/tasks/:taskId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { planId, taskId } = req.params;
    const { completed } = req.body;
    
    // Check if plan belongs to user
    const planCheck = await db.query(
      'SELECT id FROM study_plans WHERE id = $1 AND user_id = $2',
      [planId, userId]
    );
    
    if (planCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Study plan not found or not authorized' });
    }
    
    const result = await db.query(
      'UPDATE study_tasks SET completed = $1, updated_at = NOW() WHERE id = $2 AND plan_id = $3 RETURNING *',
      [completed, taskId, planId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({
      message: 'Task updated successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
