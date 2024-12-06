import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

// Charge les variables d'environnement depuis .env en développement
if (process.env.NODE_ENV !== 'production') {
  config();
}

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