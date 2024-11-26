import multer from 'multer';
import { join } from 'path';

// Extensions RINEX supportées
const RINEX_EXTENSIONS = {
  // RINEX 2.x
  observation: ['.obs', '.o', '.21o', '.22o', '.23o', '.24o', '.25o'],
  navigation: ['.nav', '.n', '.21n', '.22n', '.23n', '.24n', '.25n'],
  meteorological: ['.met', '.m', '.21m', '.22m', '.23m', '.24m', '.25m'],
  clock: ['.clk', '.c', '.21c', '.22c', '.23c', '.24c', '.25c'],
  // RINEX 3.x
  observation3: ['.rnx', '.23o', '.24o', '.25o'],
  navigation3: ['.23n', '.24n', '.25n'],
  // Types spécifiques RINEX 3
  mixed: ['.crx', '.23d', '.24d', '.25d'],
  ionosphere: ['.23i', '.24i', '.25i'],
  antenna: ['.23a', '.24a', '.25a']
};

// Fonction pour valider l'extension du fichier
function isValidRinexFile(filename) {
  const ext = '.' + filename.split('.').pop().toLowerCase();
  const yearPattern = /\d{2}[ondmcia]$/i; // Vérifie le format YYt (t: type)
  
  // Vérifier toutes les extensions valides
  const allExtensions = Object.values(RINEX_EXTENSIONS).flat();
  const isValidExt = allExtensions.includes(ext);
  
  // Vérifier si c'est un format avec année (ex: 21o, 22n, etc.)
  const isYearFormat = yearPattern.test(filename);
  
  return isValidExt || isYearFormat;
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtre des fichiers
const fileFilter = (req, file, cb) => {
  if (isValidRinexFile(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier RINEX non supporté'));
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max
  }
});