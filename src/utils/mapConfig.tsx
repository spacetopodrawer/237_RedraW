import mapboxgl from 'mapbox-gl';

export interface MapConfig {
  center: [number, number];
  zoom: number;
  style: string;
  interactive?: boolean;
  minZoom?: number;
  maxZoom?: number;
}

export const MAP_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  terrain: 'mapbox://styles/mapbox/terrain-v2',
  dark: 'mapbox://styles/mapbox/dark-v10',
  light: 'mapbox://styles/mapbox/light-v10',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11'
};

export const DEFAULT_CONFIG: MapConfig = {
  center: [11.5021, 3.8480], // Yaoundé, Cameroun
  zoom: 12,
  style: MAP_STYLES.streets,
  minZoom: 5,
  maxZoom: 20,
  interactive: true
};

export const initializeMap = (container: HTMLElement, config: MapConfig = DEFAULT_CONFIG): mapboxgl.Map => {
  const map = new mapboxgl.Map({
    container,
    style: config.style,
    center: config.center,
    zoom: config.zoom,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    interactive: config.interactive,
    attributionControl: true,
    pitchWithRotate: config.interactive,
    dragRotate: config.interactive
  });

  if (config.interactive) {
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: true
      }),
      'top-right'
    );
  }

  return map;
};