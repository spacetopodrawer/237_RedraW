import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { connectDatabase } from '../config/database';
import authRoutes from '../routes/auth.routes';
import gnssRoutes from '../routes/gnss.routes';

const api = express();

// Middleware
api.use(cors());
api.use(json());
api.use(urlencoded({ extended: true }));

// Routes
const router = Router();
router.use('/auth', authRoutes);
router.use('/gnss', gnssRoutes);

// Add router to main api
api.use('/.netlify/functions/api', router);

// Connect to database
connectDatabase().catch(console.error);

// Serverless handler
export const handler = serverless(api);