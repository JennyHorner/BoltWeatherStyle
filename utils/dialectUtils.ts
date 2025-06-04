import { Weather } from '@/types';

// Define regional dialect phrases
const dialectPhrases: Record<string, Record<string, string[]>> = {
  'Edinburgh': {
    'rain': [
      'A proper dreich day calls for waterproofs',
      'It\'s fair hoying down, you\'ll need a good coat',
      'Just a wee smirr, nothing to fret about',
    ],
    'cloud': [
      'A haar rolling in from the Forth today',
      'Skies as grey as Arthur\'s Seat in winter',
      'A dull day but the clouds might lift',
    ],
    'sun': [
      'Sunny Dunny today but the wind\'s still got teeth',
      'A grand day for the Royal Mile',
      'Bright enough to see all the way to Fife',
    ],
    'cold': [
      'Baltic today, wrap up warm',
      'Bitter cold coming down from the Pentlands',
      'Nithering out there, you\'ll need your warmest woolens',
    ],
    'wind': [
      'A right gusty one coming off the Forth',
      'Wind would cut you in two today',
      'Blowing a hoolie up by the castle',
    ],
  },
  'Bristol': {
    'rain': [
      'Brizzle drizzle today—too damp for daps',
      'Proper mizzling out there, like',
      'Splashing up the Harbourside today',
    ],
    'cloud': [
      'Gert big clouds hanging over the Suspension Bridge',
      'Grey as the Avon, mind',
      'Murky skies over Clifton today',
    ],
    'sun': [
      'Sunshine bathing Brandon Hill today',
      'Lush day for sitting on the Downs',
      'Proper job sunshine today',
    ],
    'cold': [
      'Tis proper parky out there',
      'Nippy enough to need a good chunky knit',
      'Cold enough to see your breath in Stokes Croft',
    ],
    'wind': [
      'Blowing up a storm through the Gorge',
      'Windy enough to whip around the Wills Building',
      'Breezy one coming up from the Channel',
    ],
  },
  'York': {
    'rain': [
      'Raining cats and dogs down Stonegate',
      'Bit of a downpour on the city walls',
      'Just a spit o\' rain, nothing to worry about',
    ],
    'cloud': [
      'Claggy skies hanging over the Minster',
      'Thick cloud cover as far as the eye can see',
      'Overcast like a Yorkshire blanket',
    ],
    'sun': [
      'Sun shining on the Shambles today',
      'Bright enough to light up Clifford\'s Tower',
      'Golden rays bouncing off the river Ouse',
    ],
    'cold': [
      'Brass monkeys weather today',
      'Nithering out there, layer up',
      'Cold enough to freeze the Foss',
    ],
    'wind': [
      'Wind whistling through Micklegate Bar',
      'Blustery enough to blow your flat cap off',
      'Gusts coming in from the moors',
    ],
  },
  'London': {
    'rain': [
      'Typical London drizzle, nothing an umbrella can\'t fix',
      'Raining on the Thames parade today',
      'Spitting enough to dampen Trafalgar Square',
    ],
    'cloud': [
      'Grey skies looming over the Shard',
      'Cloudy as a pub on Friday night',
      'Overcast from Westminster to Whitechapel',
    ],
    'sun': [
      'Sun putting on a show for the South Bank',
      'Bright enough to warrant sunglasses in Soho',
      'Golden hour stretching across Hyde Park',
    ],
    'cold': [
      'Bitter wind whipping down Oxford Street',
      'Chilly enough for gloves on the tube',
      'Cold nipping at your heels in Covent Garden',
    ],
    'wind': [
      'Gusts swirling around the skyscrapers',
      'Wind tunnelling through the city streets',
      'Breezy enough to ruffle feathers at St James\'s Park',
    ],
  },
  'Glasgow': {
    'rain': [
      'Absolutely pelting it down on Buchanan Street',
      'Soaking wet out there, bring a proper jacket',
      'The Clyde\'s getting topped up with this downpour',
    ],
    'cloud': [
      'Heavy clouds hanging over the Necropolis',
      'Grey skies over the Green today',
      'Dull as dishwater over the Merchant City',
    ],
    'sun': [
      'Taps aff weather in Kelvingrove',
      'Sun splitting the stones in George Square',
      'A rare golden day for the Dear Green Place',
    ],
    'cold': [
      'Absolutely baltic out there, layer up',
      'Freezing your bahookie off in this weather',
      'Cold enough to see your breath in the Barras',
    ],
    'wind': [
      'Howling gales down Sauchiehall Street',
      'Wind strong enough to lift your kilt',
      'Blowing a hoolie across the Kingston Bridge',
    ],
  },
  'default': {
    'rain': [
      'Looks like rain is settling in for the day',
      'A proper shower system moving through',
      'Light precipitation expected throughout the day',
    ],
    'cloud': [
      'Cloudy with little chance of brightening up',
      'Overcast skies for most of the day',
      'Grey cloud cover hanging about',
    ],
    'sun': [
      'Clear skies and sunshine ahead',
      'Bright and pleasant conditions expected',
      'Sunny spells throughout the day',
    ],
    'cold': [
      'Distinctly chilly today, multiple layers recommended',
      'Cold snap continuing with below average temperatures',
      'A brisk day ahead, wrap up well',
    ],
    'wind': [
      'Blustery conditions expected throughout',
      'Strong gusts making it feel colder than it is',
      'Wind picking up as the day progresses',
    ],
  },
};

// Get dialectal weather summary based on location and conditions
export function getDialectSummary(weather: Weather, location: string): string {
  // Extract city name from location string (e.g., "Edinburgh, UK" -> "Edinburgh")
  const city = location.split(',')[0].trim();
  
  // Determine weather type for dialect selection
  let weatherType = 'cloud'; // default
  const condition = weather.condition.toLowerCase();
  
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    weatherType = 'rain';
  } else if (condition.includes('clear') || condition.includes('sunny')) {
    weatherType = 'sun';
  } else if (condition.includes('cloud') || condition.includes('overcast')) {
    weatherType = 'cloud';
  }
  
  // Add temperature or wind modifiers
  if (weather.temperature < 8) {
    weatherType = 'cold';
  } else if (weather.windSpeed > 20) {
    weatherType = 'wind';
  }
  
  // Get dialect phrases for this location and weather type
  const locationDialects = dialectPhrases[city] || dialectPhrases['default'];
  const phrases = locationDialects[weatherType] || dialectPhrases['default'][weatherType];
  
  // Select a random phrase from the available options
  return phrases[Math.floor(Math.random() * phrases.length)];
}