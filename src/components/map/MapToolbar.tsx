import React, { useState } from 'react';
import { MAP_STYLES } from '../../utils/mapConfig';

interface MapToolbarProps {
  onLayerToggle: (layerId: string, visible: boolean) => void;
  onStyleChange: (styleId: keyof typeof MAP_STYLES) => void;
}

const MapToolbar: React.FC<MapToolbarProps> = ({ onLayerToggle, onStyleChange }) => {
  const [layers, setLayers] = useState({
    satellite: false,
    terrain: false,
    buildings: true,
    cadastre: false,
    points: true,
    labels: true
  });

  const handleLayerChange = (layerId: keyof typeof layers) => {
    setLayers(prev => {
      const newValue = !prev[layerId];
      onLayerToggle(layerId, newValue);
      return { ...prev, [layerId]: newValue };
    });
  };

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md max-w-xs">
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium text-sm mb-2">Style de carte</h3>
          <select 
            onChange={(e) => onStyleChange(e.target.value as keyof typeof MAP_STYLES)}
            className="w-full text-sm border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(MAP_STYLES).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-2">Couches</h3>
          <div className="flex flex-col space-y-3">
            {Object.entries(layers).map(([layerId, isVisible]) => (
              <label key={layerId} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => handleLayerChange(layerId as keyof typeof layers)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm capitalize">
                  {layerId === 'cadastre' ? 'Cadastre' : 
                   layerId === 'buildings' ? 'Bâtiments' :
                   layerId === 'points' ? 'Points d\'intérêt' :
                   layerId === 'labels' ? 'Étiquettes' :
                   layerId}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => {
              // Reset to default layers
              setLayers({
                satellite: false,
                terrain: false,
                buildings: true,
                cadastre: false,
                points: true,
                labels: true
              });
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapToolbar;