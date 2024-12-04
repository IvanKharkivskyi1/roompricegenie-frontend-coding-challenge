import { useQuery } from '@tanstack/react-query';
import type { PriceData, SettingsData } from '../types';

// Fetch prices data
export const getPrices = async (): Promise<PriceData> => {
  const response = await fetch('/api/prices');
  if (!response.ok) {
    throw new Error('Failed to fetch prices');
  }
  return response.json();
};

// Fetch settings data
export const getSettings = async (): Promise<SettingsData> => {
  const response = await fetch('/api/settings');
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  return response.json();
};

// Prices hook
export const usePrices = () =>
  useQuery({
    queryKey: ['prices'],
    queryFn: getPrices,
  });

// Settings hook
export const useSettings = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
