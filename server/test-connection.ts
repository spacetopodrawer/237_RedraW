import { connectDatabase } from './config/database';

async function testConnection() {
  try {
    await connectDatabase();
    console.log('✅ Connexion à MongoDB Atlas réussie !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
    process.exit(1);
  }
}

testConnection();