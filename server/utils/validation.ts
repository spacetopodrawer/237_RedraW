import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

export const GNSSDataSchema = z.object({
  coordinates: z.array(z.number()).length(3),
  timestamp: z.string().datetime(),
  type: z.enum(['rinex', 'nmea']),
  accuracy: z.number().optional()
});