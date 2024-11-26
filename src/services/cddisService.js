import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { join } from 'path';

const CDDIS_BASE_URL = 'https://cddis.nasa.gov/archive/gnss/data';
const SYSTEMS = ['GPS', 'GLONASS', 'GALILEO', 'BEIDOU'];

export class CDDISService {
  constructor() {
    this.dataDir = join(process.cwd(), 'data', 'navigation');
  }

  async downloadNavigationFiles(observationDate, options = {}) {
    const {
      systems = ['GPS'],
      hourly = false,
      ultraRapid = false
    } = options;

    await fs.mkdir(this.dataDir, { recursive: true });
    const results = [];

    for (const system of systems) {
      try {
        if (ultraRapid) {
          const ultraFile = await this.downloadUltraRapid(system);
          if (ultraFile) results.push(ultraFile);
        }

        if (hourly) {
          const hourlyFiles = await this.downloadHourlyFiles(observationDate, system);
          results.push(...hourlyFiles);
        } else {
          const dailyFile = await this.downloadDailyFile(observationDate, system);
          if (dailyFile) results.push(dailyFile);
        }
      } catch (error) {
        console.error(`Erreur téléchargement ${system}:`, error);
      }
    }

    return results;
  }

  async downloadDailyFile(date, system) {
    const year = date.getFullYear();
    const doy = this.getDayOfYear(date);
    const yearLastTwo = year.toString().slice(-2);

    const systemPrefix = this.getSystemPrefix(system);
    const filename = `${systemPrefix}${doy}0.${yearLastTwo}n`;
    const url = `${CDDIS_BASE_URL}/daily/${year}/${doy}/${yearLastTwo}n/${filename}`;

    return this.downloadFile(url, join(this.dataDir, 'daily', year.toString()), filename);
  }

  async downloadHourlyFiles(date, system) {
    const year = date.getFullYear();
    const doy = this.getDayOfYear(date);
    const hour = date.getHours();
    const yearLastTwo = year.toString().slice(-2);
    const results = [];

    const systemPrefix = this.getSystemPrefix(system);
    const hourStr = hour.toString().padStart(2, '0');
    const filename = `${systemPrefix}${doy}${hourStr}.${yearLastTwo}n`;
    const url = `${CDDIS_BASE_URL}/hourly/${year}/${doy}/hour${hourStr}/${filename}`;

    const file = await this.downloadFile(
      url, 
      join(this.dataDir, 'hourly', year.toString(), doy.toString()), 
      filename
    );
    if (file) results.push(file);

    return results;
  }

  async downloadUltraRapid(system) {
    const systemPrefix = this.getSystemPrefix(system);
    const filename = `${systemPrefix}u_current.sp3`;
    const url = `${CDDIS_BASE_URL}/products/current/${filename}`;

    return this.downloadFile(
      url,
      join(this.dataDir, 'ultra_rapid'),
      filename
    );
  }

  async downloadFile(url, dir, filename) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const filePath = join(dir, filename);

      // Vérifier si le fichier existe déjà et n'est pas trop vieux
      try {
        const stats = await fs.stat(filePath);
        const ageHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
        if (ageHours < 24) {
          return { path: filePath, filename, cached: true };
        }
      } catch (e) {
        // Le fichier n'existe pas, on continue
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const buffer = await response.buffer();
      await fs.writeFile(filePath, buffer);

      return {
        path: filePath,
        filename,
        cached: false
      };
    } catch (error) {
      console.error(`Erreur téléchargement ${filename}:`, error);
      return null;
    }
  }

  getSystemPrefix(system) {
    switch (system.toUpperCase()) {
      case 'GPS': return 'brdc';
      case 'GLONASS': return 'glo';
      case 'GALILEO': return 'gal';
      case 'BEIDOU': return 'bds';
      default: return 'brdc';
    }
  }

  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day.toString().padStart(3, '0');
  }
}</content>
</boltArtifact>

Maintenant, mettons à jour le contrôleur de traitement pour utiliser ce service :

<boltArtifact id="update-process-controller" title="Mise à jour du contrôleur de traitement">
<boltAction type="file" filePath="src/controllers/processController.js">import { ProcessingService } from '../services/processingService.js';
import { CDDISService } from '../services/cddisService.js';

const processingService = new ProcessingService();
const cddisService = new CDDISService();

export const handleProcess = async (req, res) => {
  try {
    const { 
      filename,
      method = 'ppp',
      startTime,
      endTime,
      systems = ['GPS'],
      useHourly = false,
      useUltraRapid = false
    } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Nom de fichier manquant' });
    }

    // Télécharger les fichiers de navigation nécessaires
    const processDate = startTime ? new Date(startTime) : new Date();
    const navFiles = await cddisService.downloadNavigationFiles(processDate, {
      systems,
      hourly: useHourly,
      ultraRapid: useUltraRapid
    });

    if (navFiles.length === 0) {
      return res.status(500).json({ 
        error: 'Impossible de télécharger les fichiers de navigation' 
      });
    }

    // Traiter les données
    const results = await processingService.processData(filename, {
      method,
      navigationFiles: navFiles,
      startTime,
      endTime
    });
    
    res.json({
      message: 'Traitement terminé',
      results: {
        filename,
        timestamp: new Date().toISOString(),
        status: 'success',
        navigationFiles: navFiles.map(f => ({
          name: f.filename,
          cached: f.cached
        })),
        ...results
      }
    });
  } catch (error) {
    console.error('Erreur traitement:', error);
    res.status(500).json({ error: error.message });
  }
};