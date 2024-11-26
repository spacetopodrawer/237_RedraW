import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { uploadRouter } from './routes/upload.js';
import { processRouter } from './routes/process.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes API
app.use('/api', uploadRouter);
app.use('/api', processRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API serveur démarré sur http://localhost:${port}`);
});