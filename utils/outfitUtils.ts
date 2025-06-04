import { Weather, OutfitSuggestion } from '@/types';

// Generate outfit suggestions based on weather conditions
export function getOutfitSuggestion(weather: Weather): OutfitSuggestion {
  const { temperature, windSpeed, precipitation, humidity } = weather;
  const condition = weather.condition.toLowerCase();
  
  // Base layer suggestions based on temperature
  let baseLayers = '';
  if (temperature < 5) {
    baseLayers = 'Thermal underwear, heavy cotton or wool socks, long-sleeve cotton shirt';
  } else if (temperature < 10) {
    baseLayers = 'Long-sleeve cotton shirt, warm socks, light thermal layer if needed';
  } else if (temperature < 15) {
    baseLayers = 'Cotton t-shirt or light long-sleeve, regular socks';
  } else if (temperature < 20) {
    baseLayers = 'Light cotton t-shirt, thin socks';
  } else {
    baseLayers = 'Breathable t-shirt, thin cotton socks or no-show socks';
  }
  
  // Mid layer suggestions based on temperature and humidity
  let midLayers = '';
  if (temperature < 5) {
    midLayers = 'Heavy wool sweater or fleece, lined trousers';
  } else if (temperature < 10) {
    midLayers = 'Light wool jumper or cardigan, regular trousers or jeans';
  } else if (temperature < 15) {
    midLayers = humidity > 70 
      ? 'Light cardigan or cotton jumper, non-clingy trousers or jeans' 
      : 'Light jumper or button-up shirt, regular trousers or jeans';
  } else if (temperature < 20) {
    midLayers = 'Optional light shirt or blouse for layering, casual trousers or skirt';
  } else {
    midLayers = humidity > 70 
      ? 'Minimal layering, loose-fitting shorts or skirt' 
      : 'No mid layer needed, shorts, skirt or light trousers';
  }
  
  // Outer layer suggestions based on temperature, wind, and precipitation
  let outerLayers = '';
  if (precipitation > 50 || condition.includes('rain') || condition.includes('drizzle')) {
    if (temperature < 10) {
      outerLayers = 'Waterproof coat with insulation, consider hood or hat, waterproof boots';
    } else {
      outerLayers = 'Lightweight waterproof jacket, water-resistant footwear';
    }
  } else if (windSpeed > 20) {
    if (temperature < 10) {
      outerLayers = 'Windproof coat with good structure, scarf for neck protection, sturdy shoes';
    } else {
      outerLayers = 'Windbreaker or light jacket with structure, secure hat if needed';
    }
  } else if (temperature < 5) {
    outerLayers = 'Heavy winter coat, gloves, hat, insulated boots';
  } else if (temperature < 10) {
    outerLayers = 'Medium weight coat or jacket, light gloves if windy';
  } else if (temperature < 15) {
    outerLayers = 'Light jacket or heavy cardigan, closed shoes';
  } else if (temperature < 20) {
    outerLayers = windSpeed > 15 
      ? 'Light jacket or overshirt, any footwear appropriate' 
      : 'Optional light overshirt or jacket, any footwear';
  } else {
    outerLayers = 'No outer layer needed, perhaps a light shawl for evening, sandals or light shoes';
  }
  
  // Wildcard suggestions for style and personality
  let wildcard = '';
  
  // Based on weather condition
  if (condition.includes('rain') || condition.includes('drizzle')) {
    wildcard = getRandomItem([
      'A colorful umbrella to brighten the day',
      'Water-resistant bag to protect your belongings',
      'Hat with brim to keep rain off your face',
      'Waterproof watch or jewelry that can handle dampness',
    ]);
  } else if (condition.includes('cloud') || condition.includes('overcast')) {
    wildcard = getRandomItem([
      'A piece of statement jewelry to combat the grey',
      'Colorful scarf to add visual interest',
      'Textured accessories for depth on a flat day',
      'A hint of color in your socks or pocket square',
    ]);
  } else if (condition.includes('clear') || condition.includes('sunny')) {
    wildcard = getRandomItem([
      'Sunglasses with personality',
      'Light-colored hat with good brim',
      'A piece of statement jewelry that catches the light',
      'Playful pocket square or hair accessory',
    ]);
  } else if (condition.includes('snow')) {
    wildcard = getRandomItem([
      'Touchscreen-compatible gloves',
      'Colorful knit hat to stand out against the white',
      'Thermal flask for hot drinks',
      'Snow-appropriate boots with personality',
    ]);
  } else if (windSpeed > 20) {
    wildcard = getRandomItem([
      'Secure hat that won\'t blow away',
      'Scarf that can double as a face shield',
      'Earrings that won\'t catch the wind',
      'A bag that can be worn close to the body',
    ]);
  }
  
  // Flourish - mood-adjacent final touch
  let flourish = '';
  
  if (condition.includes('rain')) {
    flourish = getRandomItem([
      'A day for embracing the melancholy with thoughtful accessories',
      'The patter of rain calls for quiet confidence in your styling',
      'Weather for introspection reflected in subtle details',
    ]);
  } else if (condition.includes('clear') || condition.includes('sunny')) {
    flourish = getRandomItem([
      'A morning for bold earrings and no regrets',
      'Weather that deserves your most confident silhouette',
      'Let your accessories catch the light as boldly as you please',
    ]);
  } else if (temperature < 5) {
    flourish = getRandomItem([
      'Cold that demands defiance through careful layering',
      'Weather that rewards those who understand the art of insulation',
      'A day when style lies in the subtle balance of necessity and flair',
    ]);
  } else if (temperature > 25) {
    flourish = getRandomItem([
      'Heat that calls for elegant minimalism',
      'A day when less truly becomes more',
      'Weather for celebrating the luxury of simplicity',
    ]);
  } else {
    flourish = getRandomItem([
      'A day that rewards thoughtful accessorizing',
      'Weather that asks for balance in all things',
      'Consider this a canvas for your personal expression',
    ]);
  }
  
  return {
    baseLayers,
    midLayers,
    outerLayers,
    wildcard,
    flourish,
  };
}

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}