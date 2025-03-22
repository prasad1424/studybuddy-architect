
import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor to include auth token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string, role: string = 'student') => {
    const response = await apiClient.post('/auth/register', { name, email, password, role });
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/users/profile', profileData);
    return response.data;
  },
  getGoals: async () => {
    const response = await apiClient.get('/users/goals');
    return response.data;
  },
  createGoal: async (goalData: any) => {
    const response = await apiClient.post('/users/goals', goalData);
    return response.data;
  },
  updateGoal: async (goalId: string, goalData: any) => {
    const response = await apiClient.put(`/users/goals/${goalId}`, goalData);
    return response.data;
  },
};

// Study Plan API calls
export const studyPlanAPI = {
  getPlans: async () => {
    const response = await apiClient.get('/study-plans');
    return response.data;
  },
  getPlan: async (planId: string) => {
    const response = await apiClient.get(`/study-plans/${planId}`);
    return response.data;
  },
  createPlan: async (planData: any) => {
    const response = await apiClient.post('/study-plans', planData);
    return response.data;
  },
  updatePlan: async (planId: string, planData: any) => {
    const response = await apiClient.put(`/study-plans/${planId}`, planData);
    return response.data;
  },
  deletePlan: async (planId: string) => {
    const response = await apiClient.delete(`/study-plans/${planId}`);
    return response.data;
  },
};

// Feedback API calls
export const feedbackAPI = {
  getFeedback: async () => {
    const response = await apiClient.get('/feedback');
    return response.data;
  },
  submitFeedback: async (feedbackData: any) => {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  },
};

// Recommendation API calls
export const recommendationAPI = {
  getRecommendations: async () => {
    const response = await apiClient.get('/recommendations');
    return response.data;
  },
};

export default apiClient;
