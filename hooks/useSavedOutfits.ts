import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedOutfit } from '@/types';

export function useSavedOutfits() {
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);

  // Load saved outfits on mount
  useEffect(() => {
    loadSavedOutfits();
  }, []);

  const loadSavedOutfits = async () => {
    try {
      const savedData = await AsyncStorage.getItem('savedOutfits');
      if (savedData) {
        setSavedOutfits(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading saved outfits:', error);
    }
  };

  const saveOutfit = async (outfit: SavedOutfit) => {
    try {
      // Check if outfit already exists
      const exists = savedOutfits.some(item => item.id === outfit.id);
      
      let updatedOutfits: SavedOutfit[];
      
      if (exists) {
        // Update existing outfit
        updatedOutfits = savedOutfits.map(item => 
          item.id === outfit.id ? outfit : item
        );
      } else {
        // Add new outfit
        updatedOutfits = [...savedOutfits, outfit];
      }
      
      // Save to state and storage
      setSavedOutfits(updatedOutfits);
      await AsyncStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
      
      return true;
    } catch (error) {
      console.error('Error saving outfit:', error);
      return false;
    }
  };

  const removeSavedOutfit = async (outfitId: string) => {
    try {
      const updatedOutfits = savedOutfits.filter(outfit => outfit.id !== outfitId);
      setSavedOutfits(updatedOutfits);
      await AsyncStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
      return true;
    } catch (error) {
      console.error('Error removing saved outfit:', error);
      return false;
    }
  };

  const isSaved = (location: string, condition: string): boolean => {
    return savedOutfits.some(outfit => outfit.id === location + condition);
  };

  return {
    savedOutfits,
    saveOutfit,
    removeSavedOutfit,
    isSaved,
  };
}