import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useFavoriteLocations() {
  const [favorites, setFavorites] = useState<string[]>([
    'Edinburgh, UK',
    'London, UK',
    'Bristol, UK',
    'York, UK'
  ]);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favoriteLocations');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorite locations:', error);
    }
  };

  const addFavorite = async (location: string) => {
    try {
      // Check if location already exists
      if (!favorites.includes(location)) {
        const updatedFavorites = [...favorites, location];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
      }
      return true;
    } catch (error) {
      console.error('Error adding favorite location:', error);
      return false;
    }
  };

  const removeFavorite = async (location: string) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav !== location);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
      return true;
    } catch (error) {
      console.error('Error removing favorite location:', error);
      return false;
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
}