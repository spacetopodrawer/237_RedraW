export interface CoordinateSystem {
    code: string;
    name: string;
    proj4def: string;
  }
  
  export interface PointOfInterest {
    id: string;
    name: string;
    coordinates: [number, number];
    altitude?: number;
    description?: string;
    category?: string;
    icon?: string;
    photos?: string[];
    audio?: string[];
    notes?: string;
    timestamp: Date;
    tags?: string[];
  }
  
  export interface Geometry {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[][] | number[][][];
  }
  
  export interface Feature {
    id: string;
    type: 'Feature';
    geometry: Geometry;
    properties: {
      name?: string;
      description?: string;
      measurements?: Measurement[];
      style?: FeatureStyle;
    };
  }
  
  export interface Measurement {
    type: 'distance' | 'angle' | 'area';
    value: number;
    unit: string;
  }
  
  export interface FeatureStyle {
    color?: string;
    weight?: number;
    opacity?: number;
    fillColor?: string;
    fillOpacity?: number;
  }