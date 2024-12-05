import { useState, useCallback } from 'react';
import { GnssData } from '../types';
import { exportToFormat } from '../utils/exportUtils';
import { useGnssStore } from '../store/gnssStore';

export const useGnssRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { addPoint, updatePoint } = useGnssStore();

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const recordPoint = useCallback((data: GnssData) => {
    addPoint(data);
  }, [addPoint]);

  const exportData = useCallback(async (format: string, points: GnssData[]) => {
    return await exportToFormat(format, points);
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordPoint,
    exportData
  };
};