import express from 'express';
import { connectDatabase } from './config/database';
import { setupMiddleware } from './config/middleware';
import authRoutes from './routes/auth.routes';
import gnssRoutes from './routes/gnss.routes';
import { env } from './config/env';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
setupMiddleware(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gnss', gnssRoutes);

// Connect to database
connectDatabase().catch(console.error);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});