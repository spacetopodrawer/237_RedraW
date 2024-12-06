import { Request, Response } from 'express';
import { GNSSDataModel } from '../models/gnss-data.model';
import { GNSSDataSchema } from '../utils/validation';

export class GNSSController {
  static async uploadData(req: Request, res: Response) {
    try {
      const validatedData = GNSSDataSchema.parse(req.body);
      const gnssData = await GNSSDataModel.create({
        ...validatedData,
        userId: req.user.id
      });
      res.status(201).json(gnssData);
    } catch (error) {
      res.status(400).json({ error: 'Invalid GNSS data' });
    }
  }

  static async getData(req: Request, res: Response) {
    try {
      const data = await GNSSDataModel.find({ userId: req.user.id });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve GNSS data' });
    }
  }
}