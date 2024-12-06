import express from 'express';
import { connectDatabase } from './config/database';
import { setupMiddleware } from './config/middleware';
import authRoutes from './routes/auth.routes';
import gnssRoutes from './routes/gnss.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
setupMiddleware(app);

// Connect to database
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gnss', gnssRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});