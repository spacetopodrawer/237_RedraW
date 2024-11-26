import express from 'express';
import { handleProcess } from '../controllers/processController.js';

export const processRouter = express.Router();

processRouter.post('/process', handleProcess);