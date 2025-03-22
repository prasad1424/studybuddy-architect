
# StudyBuddy Backend

This is the backend API for the StudyBuddy application, a platform that helps students plan and track their self-study activities with guidance from mentors.

## Features

- User authentication (students, parents/mentors, administrators)
- Study plan management
- Task tracking
- Feedback system for mentors to provide guidance
- AI-powered study recommendations
- Real-time notifications via WebSockets

## Technology Stack

- Node.js with Express.js
- PostgreSQL for data storage
- Socket.IO for real-time communication
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
FRONTEND_URL=http://localhost:3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=studybuddy
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

### Database Setup

1. Create a PostgreSQL database named `studybuddy`
2. Run the SQL script in `src/server/db/schema.sql` to create the required tables

```bash
psql -U postgres -d studybuddy -f src/server/db/schema.sql
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev:server
```

The server will be available at http://localhost:5000.

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive JWT token

### User Management
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- GET /api/users/goals - Get user's academic goals
- POST /api/users/goals - Create a new academic goal
- PUT /api/users/goals/:goalId - Update an academic goal

### Study Plans
- GET /api/study-plans - Get all study plans for a user
- GET /api/study-plans/:planId - Get a single study plan
- POST /api/study-plans - Create a new study plan
- PUT /api/study-plans/:planId - Update a study plan
- DELETE /api/study-plans/:planId - Delete a study plan
- GET /api/study-plans/:planId/tasks - Get all tasks for a study plan
- POST /api/study-plans/:planId/tasks - Create a new task
- PATCH /api/study-plans/:planId/tasks/:taskId - Update task completion status

### Feedback
- GET /api/feedback/received - Get all feedback received (for students)
- GET /api/feedback/given - Get all feedback given (for mentors/parents)
- POST /api/feedback - Submit new feedback
- PATCH /api/feedback/:feedbackId - Mark feedback as helpful/read

### Recommendations
- GET /api/recommendations - Get AI-powered study recommendations
- POST /api/recommendations/generate - Generate new AI recommendations

## WebSocket Events

- `join` - Join a user-specific room for private notifications
- `new-feedback` - Notification when new feedback is received
- `study-plan-created` - Notification when a new study plan is created
- `task-created` - Notification when a new task is created
- `new-recommendation` - Notification when a new recommendation is available

## Authentication and Authorization

The API uses JWT tokens for authentication. Most endpoints require a valid token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

Different user roles (student, mentor, parent, admin) have different access permissions.

## Error Handling

The API returns standardized error responses with appropriate HTTP status codes and error messages.

## Future Improvements

- Integration with external AI services for more sophisticated recommendations
- Enhanced analytics features
- Mobile push notifications
- OAuth for social login
