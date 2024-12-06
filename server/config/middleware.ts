import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export function setupMiddleware(app: express.Application) {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}