import { Weather } from '@/types';
import Constants from 'expo-constants';

const OPENWEATHER_API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey;
const OPENAI_API_KEY = Constants.expoConfig?.extra?.openAiApiKey;

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const fetchWeather = async (location: string): Promise<Weather> => {
  try {
    // First, get coordinates for the location
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.length) {
      throw new Error('Location not found');
    }

    const { lat, lon } = geocodeData[0];

    // Then, get weather data using coordinates
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Get AI-enhanced weather description
    const prompt = `Given the weather conditions in ${location}: ${weatherData.weather[0].description}, temperature ${Math.round(weatherData.main.temp)}°C, humidity ${weatherData.main.humidity}%, wind speed ${Math.round(weatherData.wind.speed * 3.6)} km/h. Provide a brief, natural description of the weather using local dialect and expressions. Keep it concise and weather-focused.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const enhancedDescription = completion.choices[0].message.content || weatherData.weather[0].description;

    return {
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      condition: enhancedDescription,
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      precipitation: weatherData.rain ? weatherData.rain['1h'] * 100 : 0, // Convert to percentage
      forecast: [], // Note: We'll need a separate API call for forecast data
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};