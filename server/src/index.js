import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { constants } from './config/constants.js';

import rtkRouter from './routes/rtk.js';
import gnssRouter from './routes/gnss.js';
import gisRouter from './routes/gis.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors({
  origin: constants.CORS.ORIGIN,
  methods: constants.CORS.METHODS
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes API
const apiPrefix = constants.API.PREFIX;
app.use(`${apiPrefix}/rtk`, rtkRouter);
app.use(`${apiPrefix}/gnss`, gnssRouter);
app.use(`${apiPrefix}/gis`, gisRouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});