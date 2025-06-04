import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { fetchWeather } from '@/services/weatherService';
import { Weather } from '@/types';

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<string>('Edinburgh, UK');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get current location on mount (if on native)
  useEffect(() => {
    if (Platform.OS !== 'web') {
      getCurrentLocation();
    }
  }, []);

  // Fetch weather when location changes
  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get city name
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (geocode.length > 0) {
        const { city, country } = geocode[0];
        if (city && country) {
          setLocation(`${city}, ${country}`);
        }
      }
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Could not determine your location');
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherData = await fetchWeather(location);
      setWeather(weatherData);
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    location,
    loading,
    error,
    setLocation,
    fetchWeatherData,
  };
}