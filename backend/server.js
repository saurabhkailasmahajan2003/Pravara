import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './controllers/taskController.js';
import {
  getDeadlines,
  createDeadline,
  updateDeadline,
  deleteDeadline,
} from './controllers/deadlineController.js';
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from './controllers/holidayController.js';
import { getProgress, updateProgress } from './controllers/progressController.js';
import {
  getAnalyticsOverview,
  upsertAnalyticsSnapshot,
} from './controllers/analyticsController.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Middleware
app.use(cors());
app.use(express.json());

// Auth
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  // In a real app, verify user credentials against database
  const user = { id: '1', email, role: 'owner' };
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, user });
});

// Authentication middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Missing token' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Task routes
app.get('/api/tasks', auth, getTasks);
app.post('/api/tasks', auth, createTask);
app.put('/api/tasks/:id', auth, updateTask);
app.delete('/api/tasks/:id', auth, deleteTask);

// Deadline routes
app.get('/api/deadlines', auth, getDeadlines);
app.post('/api/deadlines', auth, createDeadline);
app.put('/api/deadlines/:id', auth, updateDeadline);
app.delete('/api/deadlines/:id', auth, deleteDeadline);

// Holiday routes
app.get('/api/holidays', auth, getHolidays);
app.post('/api/holidays', auth, createHoliday);
app.put('/api/holidays/:id', auth, updateHoliday);
app.delete('/api/holidays/:id', auth, deleteHoliday);

// Progress routes
app.get('/api/progress', auth, getProgress);
app.put('/api/progress', auth, updateProgress);

// Analytics routes
app.get('/api/analytics', auth, getAnalyticsOverview);
app.post('/api/analytics/snapshots', auth, upsertAnalyticsSnapshot);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Root route
app.get('/', (req, res) => res.send('API running'));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
