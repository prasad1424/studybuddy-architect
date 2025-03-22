
// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Not returned in responses
  role: 'student' | 'mentor' | 'parent' | 'admin';
  university?: string;
  major?: string;
  study_preferences?: StudyPreferences;
  join_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface StudyPreferences {
  preferred_times?: string[];
  learning_style?: string[];
  study_environment?: string[];
  session_duration?: number;
}

// Study plan related types
export interface StudyPlan {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  subjects?: Subject[];
  created_at: Date;
  updated_at: Date;
  tasks?: StudyTask[]; // Populated when retrieving a single plan
}

export interface Subject {
  name: string;
  color?: string;
}

export interface StudyTask {
  id: number;
  plan_id: number;
  title: string;
  subject?: string;
  due_date?: Date;
  duration?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

// Feedback related types
export interface Feedback {
  id: number;
  author_id: number;
  student_id: number;
  message: string;
  type: 'positive' | 'suggestion' | 'concern';
  helpful?: boolean;
  created_at: Date;
  updated_at: Date;
  author_name?: string; // Populated in responses
  author_role?: string; // Populated in responses
}

// Academic goals related types
export interface AcademicGoal {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  target_date?: Date;
  progress: number; // 0-100
  created_at: Date;
  updated_at: Date;
}

// Recommendation related types
export interface Recommendation {
  id: number;
  user_id: number;
  content: string;
  source: string;
  applied: boolean;
  created_at: Date;
  updated_at: Date;
}

// Study logs for analytics
export interface StudyLog {
  id: number;
  user_id: number;
  task_id?: number;
  start_time: Date;
  end_time?: Date;
  duration?: number; // in minutes
  notes?: string;
  created_at: Date;
}

// Notification related types
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  content: string;
  type: 'feedback' | 'recommendation' | 'task' | 'plan' | 'reminder';
  read: boolean;
  created_at: Date;
}

// Request and response types
export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
  role?: 'student' | 'mentor' | 'parent' | 'admin';
}

export interface AuthResponse {
  message: string;
  user: Omit<User, 'password'>;
  token: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}
