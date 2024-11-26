import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';
import { uploadRouter } from './src/routes/upload.js';
import { processRouter } from './src/routes/process.js';
import { projectRouter } from './src/routes/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes API
app.use('/api', uploadRouter);
app.use('/api', processRouter);
app.use('/api', projectRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API serveur démarré sur http://localhost:${port}`);
});