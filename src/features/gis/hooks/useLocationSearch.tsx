import { useState, useCallback } from 'react';
import { searchLocation } from '../utils/searchUtils';
import { CoordinateSystem } from '../types';
import { transformCoordinates } from '../utils/projectionUtils';

export const useLocationSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchByName = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const results = await searchLocation(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Erreur de recherche:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCoordinates = useCallback(async (
    coordinates: number[],
    fromSystem: CoordinateSystem,
    toSystem: CoordinateSystem
  ) => {
    try {
      return transformCoordinates(coordinates, fromSystem, toSystem);
    } catch (error) {
      console.error('Erreur de transformation:', error);
      return null;
    }
  }, []);

  return {
    searchResults,
    loading,
    searchByName,
    searchByCoordinates
  };
};