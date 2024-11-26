import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import DxfParser from 'dxf-parser';
import JSZip from 'jszip';
import { convertToUTM } from '../utils/coordinateUtils.js';

export class FileConverterService {
  async convertKML(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const result = await parseStringPromise(content);
    
    const coordinates = [];
    if (result.kml.Document[0].Placemark) {
      for (const placemark of result.kml.Document[0].Placemark) {
        if (placemark.LineString) {
          const coords = placemark.LineString[0].coordinates[0]
            .trim()
            .split(' ')
            .map(coord => {
              const [lon, lat, alt] = coord.split(',').map(Number);
              return {
                lat,
                lon,
                alt,
                utm: convertToUTM(lat, lon)
              };
            });
          coordinates.push(...coords);
        }
      }
    }
    
    return coordinates;
  }
  
  async convertKMZ(filePath) {
    const content = await fs.readFile(filePath);
    const zip = new JSZip();
    await zip.loadAsync(content);
    
    const kmlFile = Object.values(zip.files).find(file => 
      file.name.toLowerCase().endsWith('.kml')
    );
    
    if (!kmlFile) {
      throw new Error('Aucun fichier KML trouvé dans le KMZ');
    }
    
    const kmlContent = await kmlFile.async('string');
    const tempPath = join(process.cwd(), 'temp', `temp_${Date.now()}.kml`);
    await fs.writeFile(tempPath, kmlContent);
    
    const coordinates = await this.convertKML(tempPath);
    await fs.unlink(tempPath);
    
    return coordinates;
  }
  
  async convertDXF(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const parser = new DxfParser();
    const dxf = parser.parseSync(content);
    
    const points = [];
    if (dxf.entities) {
      for (const entity of dxf.entities) {
        if (entity.type === 'POINT') {
          points.push({
            lat: entity.position.y,
            lon: entity.position.x,
            alt: entity.position.z,
            utm: convertToUTM(entity.position.y, entity.position.x)
          });
        }
      }
    }
    
    return points;
  }
  
  async convertCSV(filePath, options = {}) {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    
    const {
      skipHeader = true,
      latColumn = 0,
      lonColumn = 1,
      altColumn = 2,
      delimiter = ','
    } = options;
    
    const points = [];
    const startLine = skipHeader ? 1 : 0;
    
    for (let i = startLine; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(delimiter);
      const lat = parseFloat(values[latColumn]);
      const lon = parseFloat(values[lonColumn]);
      const alt = altColumn >= 0 ? parseFloat(values[altColumn]) : null;
      
      if (!isNaN(lat) && !isNaN(lon)) {
        points.push({
          lat,
          lon,
          alt: isNaN(alt) ? null : alt,
          utm: convertToUTM(lat, lon)
        });
      }
    }
    
    return points;
  }
}