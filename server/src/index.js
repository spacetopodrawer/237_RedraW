import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import rtkRouter from './routes/rtk.js';
import gnssRouter from './routes/gnss.js';
import gisRouter from './routes/gis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Connexion à MongoDB
try {
  await connectDB();
} catch (error) {
  console.error('Erreur de connexion à MongoDB:', error);
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes API
const apiPrefix = '/api/v1';
app.use(`${apiPrefix}/rtk`, rtkRouter);
app.use(`${apiPrefix}/gnss`, gnssRouter);
app.use(`${apiPrefix}/gis`, gisRouter);

// Gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;