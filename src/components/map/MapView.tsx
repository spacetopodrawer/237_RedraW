import React, { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { initializeMap, DEFAULT_CONFIG, MAP_STYLES } from '../../utils/mapConfig';
import MapControls from './MapControls';
import MapToolbar from './MapToolbar';
import { useAuthStore } from '../../store/authStore';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    map.current = initializeMap(mapContainer.current, {
      ...DEFAULT_CONFIG,
      interactive: isAuthenticated // La carte n'est interactive que si l'utilisateur est authentifié
    });

    map.current.on('click', (e: MapMouseEvent) => {
      if (isAuthenticated) {
        setCoordinates([e.lngLat.lng, e.lngLat.lat]);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [isAuthenticated]);

  const handleZoomIn = useCallback(() => {
    if (isAuthenticated && map.current) {
      map.current.zoomIn();
    }
  }, [isAuthenticated]);

  const handleZoomOut = useCallback(() => {
    if (isAuthenticated && map.current) {
      map.current.zoomOut();
    }
  }, [isAuthenticated]);

  const handleStyleChange = useCallback((styleId: keyof typeof MAP_STYLES) => {
    if (isAuthenticated && map.current) {
      map.current.setStyle(MAP_STYLES[styleId]);
    }
  }, [isAuthenticated]);

  const handleLayerToggle = useCallback((layerId: string, visible: boolean) => {
    if (isAuthenticated && map.current) {
      const visibility = visible ? 'visible' : 'none';
      map.current.setLayoutProperty(layerId, 'visibility', visibility);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      {isAuthenticated && (
        <>
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          <MapToolbar 
            onLayerToggle={handleLayerToggle}
            onStyleChange={handleStyleChange}
          />
          {coordinates && (
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
              <p className="text-sm">
                Longitude: {coordinates[0].toFixed(6)}°<br />
                Latitude: {coordinates[1].toFixed(6)}°
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapView;