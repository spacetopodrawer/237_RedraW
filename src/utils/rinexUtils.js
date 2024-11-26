import { promises as fs } from 'fs';

export async function detectRinexVersion(filePath) {
  try {
    // Lire les premiers 1024 octets du fichier
    const fileHandle = await fs.open(filePath, 'r');
    const buffer = Buffer.alloc(1024);
    await fileHandle.read(buffer, 0, 1024, 0);
    await fileHandle.close();

    const header = buffer.toString('utf8', 0, 1024);
    const lines = header.split('\n');

    // Chercher la ligne de version
    const versionLine = lines.find(line => line.includes('RINEX VERSION'));
    if (!versionLine) {
      throw new Error('Format RINEX non reconnu');
    }

    // Extraire la version et le type
    const version = parseFloat(versionLine.substring(0, 9));
    const type = determineRinexType(versionLine, version);

    return {
      version,
      type,
      isValid: true
    };
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier RINEX:', error);
    return {
      version: null,
      type: null,
      isValid: false,
      error: error.message
    };
  }
}

function determineRinexType(versionLine, version) {
  const typeChar = versionLine.charAt(20);
  
  const types = {
    'O': 'OBSERVATION',
    'N': 'NAVIGATION',
    'M': 'METEOROLOGICAL',
    'C': 'CLOCK',
    'H': 'HATANAKA',
    'I': 'IONOSPHERE',
    'A': 'ANTENNA'
  };

  return types[typeChar] || 'UNKNOWN';
}