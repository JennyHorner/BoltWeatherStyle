// Weather data interface
export interface Weather {
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: WeatherForecast[];
}

// Weather forecast for upcoming days
export interface WeatherForecast {
  day: string;
  temperature: number;
  condition: string;
}

// Saved outfit interface
export interface SavedOutfit {
  id: string;
  location: string;
  weatherSummary: string;
  weatherType: string;
  baseLayers: string;
  midLayers: string;
  outerLayers: string;
  wildcard: string;
  temperature: number;
}

// Outfit suggestion interface
export interface OutfitSuggestion {
  baseLayers: string;
  midLayers: string;
  outerLayers: string;
  wildcard: string;
  flourish: string;
}