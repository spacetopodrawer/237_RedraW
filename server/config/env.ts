import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();

export const env = cleanEnv(process.env, {
  MONGODB_URI: str({
    desc: 'MongoDB connection string',
    example: 'mongodb+srv://username:password@cluster.mongodb.net/database'
  }),
  JWT_SECRET: str({
    desc: 'Secret key for JWT tokens',
    default: 'your-secret-key'
  }),
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'development'
  })
});