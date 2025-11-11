const axios = require('axios');
const beachData = require('../data/beaches.json');

// Weather cache to avoid hammering the API
const weatherCache = new Map();
const WEATHER_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Time mappings
const TIME_HOUR_MAP = {
  'early-morning': 7,
  'morning': 10,
  'midday': 13,
  'afternoon': 16,
  'evening': 19
};

// Get weather forecast from Open-Meteo API
exports.getWeatherForecast = async (req, res) => {
  try {
    const { lat, lon, date, time } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'latitude (lat) and longitude (lon) are required'
      });
    }

    // Check cache
    const cacheKey = `${lat},${lon},${date},${time}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < WEATHER_CACHE_TTL)) {
      return res.json({ ...cached.data, cached: true });
    }

    const hour = TIME_HOUR_MAP[time] || 12;
    const weatherApiUrl = process.env.WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast';

    const response = await axios.get(weatherApiUrl, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,wind_speed_10m,wind_direction_10m,weather_code',
        timezone: 'Europe/Athens'
      }
    });

    const data = response.data;

    // Find the closest hour index
    const targetDateTime = date
      ? new Date(`${date}T${hour.toString().padStart(2, '0')}:00`)
      : new Date();

    let hourIndex = data.hourly.time.findIndex(t => new Date(t) >= targetDateTime);

    if (hourIndex === -1 || !data.hourly.wind_speed_10m[hourIndex]) {
      hourIndex = 0; // Fallback to current hour
    }

    const windSpeed = data.hourly.wind_speed_10m[hourIndex];
    const windDirection = data.hourly.wind_direction_10m[hourIndex];
    const temperature = data.hourly.temperature_2m[hourIndex];
    const weatherCode = data.hourly.weather_code[hourIndex];

    // Convert wind direction to text
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dirIndex = Math.round(windDirection / 45) % 8;
    const windDirectionText = directions[dirIndex];

    // Determine weather conditions
    const conditions = weatherCode < 3 ? 'Clear' :
                      weatherCode < 50 ? 'Partly Cloudy' :
                      weatherCode < 70 ? 'Cloudy' :
                      weatherCode < 80 ? 'Rainy' : 'Stormy';

    const result = {
      source: 'Open-Meteo API',
      location: { lat: parseFloat(lat), lon: parseFloat(lon) },
      windSpeed: Math.round(windSpeed * 10) / 10,
      windDirection: windDirection,
      windDirectionText: windDirectionText,
      temperature: Math.round(temperature * 10) / 10,
      conditions: conditions,
      weatherCode: weatherCode,
      isMeltemi: (windDirection >= 315 || windDirection <= 45) && windSpeed > 25,
      timestamp: data.hourly.time[hourIndex]
    };

    // Cache the result
    weatherCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    res.json(result);

  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      message: error.message,
      fallback: 'Weather service temporarily unavailable'
    });
  }
};

// Calculate wind protection for a beach
function calculateWindProtection(beach, windDirection, windSpeed) {
  const protectionFactors = { 'high': 0.75, 'moderate': 0.45, 'low': 0.15 };
  const meltemiFactors = { 'excellent': 0.85, 'good': 0.60, 'moderate': 0.35, 'poor': 0.10 };

  const isMeltemiWind = (windDirection >= 315 || windDirection <= 45) && windSpeed > 20;
  const protectionFactor = isMeltemiWind ?
    (meltemiFactors[beach.meltemiShield] || protectionFactors[beach.protection]) :
    protectionFactors[beach.protection];

  const effectiveWindSpeed = windSpeed * (1 - protectionFactor);

  return {
    effectiveWindSpeed: Math.round(effectiveWindSpeed * 10) / 10,
    originalWindSpeed: windSpeed,
    swimmingConditions: getSwimmingConditions(effectiveWindSpeed, isMeltemiWind),
    protectionScore: beach.protection,
    meltemiProtection: beach.meltemiShield,
    isMeltemiConditions: isMeltemiWind,
    swimmabilityScore: Math.max(10, Math.min(100, Math.round(100 - effectiveWindSpeed * 2.5))),
    windReduction: Math.round((1 - (effectiveWindSpeed / windSpeed)) * 100)
  };
}

function getSwimmingConditions(windSpeed, isMeltemi) {
  if (isMeltemi) {
    if (windSpeed <= 8) return 'Excellent';
    if (windSpeed <= 15) return 'Good';
    if (windSpeed <= 22) return 'Moderate';
    return 'Rough';
  } else {
    if (windSpeed <= 10) return 'Excellent';
    if (windSpeed <= 15) return 'Good';
    if (windSpeed <= 20) return 'Moderate';
    return 'Choppy';
  }
}

// Get beach recommendations based on weather
exports.getBeachRecommendations = async (req, res) => {
  try {
    const { island, date, time } = req.query;

    if (!island) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'island parameter is required'
      });
    }

    const islandLower = island.toLowerCase();
    const beaches = beachData.beaches[islandLower];

    if (!beaches) {
      return res.status(404).json({
        error: 'Island not found',
        message: `No beach data available for "${island}"`
      });
    }

    // Fetch weather data for all beaches
    const beachRecommendations = await Promise.all(
      beaches.map(async (beach) => {
        try {
          // Get weather for this beach
          const weatherResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/weather/forecast`, {
            params: {
              lat: beach.lat,
              lon: beach.lon,
              date: date,
              time: time
            }
          });

          const weatherData = weatherResponse.data;
          const protection = calculateWindProtection(beach, weatherData.windDirection, weatherData.windSpeed);

          return {
            name: beach.name,
            description: beach.description,
            location: { lat: beach.lat, lon: beach.lon },
            weather: weatherData,
            protection: protection,
            score: protection.swimmabilityScore,
            island: islandLower
          };
        } catch (error) {
          console.error(`Error fetching weather for ${beach.name}:`, error.message);
          return null;
        }
      })
    );

    // Filter out failed requests and sort by score
    const validRecommendations = beachRecommendations
      .filter(r => r !== null)
      .sort((a, b) => b.score - a.score);

    if (validRecommendations.length === 0) {
      return res.status(500).json({
        error: 'No recommendations available',
        message: 'Unable to fetch weather data for beaches'
      });
    }

    // Calculate overall conditions
    const avgTemp = validRecommendations.reduce((sum, b) => sum + b.weather.temperature, 0) / validRecommendations.length;
    const isMeltemiDay = validRecommendations.some(b => b.protection.isMeltemiConditions);

    res.json({
      island: island,
      date: date || 'today',
      time: time || 'current',
      totalBeaches: validRecommendations.length,
      averageTemperature: Math.round(avgTemp * 10) / 10,
      meltemiConditions: isMeltemiDay,
      topRecommendation: validRecommendations[0],
      allRecommendations: validRecommendations
    });

  } catch (error) {
    console.error('Recommendations Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error.message
    });
  }
};
