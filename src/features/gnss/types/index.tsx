export interface GnssData {
    id: string;
    latitude: number;
    longitude: number;
    altitude?: number;
    accuracy?: number;
    timestamp: Date;
    name?: string;
    tags?: string[];
    source: 'internal' | 'external';
    raw?: any;
  }
  
  export interface GnssPoint extends GnssData {
    photos?: string[];
    audio?: string[];
    notes?: string;
    icon?: string;
    iconColor?: string;
    iconSize?: number;
  }
  
  export interface GnssExportOptions {
    format: 'log' | 'nmea' | 'kml' | 'kmz' | 'csv' | 'rinex';
    includePhotos?: boolean;
    includeAudio?: boolean;
    includeNotes?: boolean;
  }