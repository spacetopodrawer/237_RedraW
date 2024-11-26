import proj4 from 'proj4';

export function convertToUTM(lat, lon) {
  const zone = Math.floor((lon + 180) / 6) + 1;
  const hemisphere = lat >= 0 ? 'N' : 'S';
  
  const utmProjection = `+proj=utm +zone=${zone}${hemisphere === 'S' ? ' +south' : ''} +ellps=WGS84 +datum=WGS84 +units=m +no_defs`;
  const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
  
  const [easting, northing] = proj4(wgs84, utmProjection, [lon, lat]);
  
  return {
    zone,
    hemisphere,
    easting: Math.round(easting * 1000) / 1000,
    northing: Math.round(northing * 1000) / 1000
  };
}

export function parseNMEA(nmeaString) {
  const sentences = nmeaString.split('\n');
  const positions = [];
  
  for (const sentence of sentences) {
    if (sentence.startsWith('$GPGGA')) {
      const parts = sentence.split(',');
      if (parts.length >= 10) {
        const lat = parseNMEACoordinate(parts[2], parts[3]);
        const lon = parseNMEACoordinate(parts[4], parts[5]);
        const quality = parseInt(parts[6]);
        const satellites = parseInt(parts[7]);
        const hdop = parseFloat(parts[8]);
        const altitude = parseFloat(parts[9]);
        
        if (!isNaN(lat) && !isNaN(lon)) {
          positions.push({
            lat,
            lon,
            quality,
            satellites,
            hdop,
            altitude,
            utm: convertToUTM(lat, lon)
          });
        }
      }
    }
  }
  
  return positions;
}

function parseNMEACoordinate(coord, dir) {
  if (!coord || !dir) return NaN;
  
  const degrees = parseInt(coord.substring(0, coord.length - 7));
  const minutes = parseFloat(coord.substring(coord.length - 7)) / 60;
  let decimal = degrees + minutes;
  
  if (dir === 'S' || dir === 'W') {
    decimal = -decimal;
  }
  
  return decimal;
}