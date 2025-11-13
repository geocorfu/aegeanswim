// Beach API Service
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    if (error.response) {
      console.error('Error Details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

class BeachService {
  /**
   * Get all available islands
   */
  async getIslands() {
    try {
      const response = await apiClient.get('/beaches/islands/list');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch islands');
    }
  }

  /**
   * Get beaches for a specific island
   */
  async getBeachesByIsland(island) {
    try {
      const response = await apiClient.get(`/beaches/${island}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch beaches for ${island}`);
    }
  }

  /**
   * Search beaches by query
   */
  async searchBeaches(query) {
    try {
      const response = await apiClient.get(`/beaches/search/${query}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Search failed');
    }
  }

  /**
   * Get weather forecast for location
   */
  async getWeatherForecast(lat, lon, date, time) {
    try {
      const response = await apiClient.get('/weather/forecast', {
        params: { lat, lon, date, time },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch weather');
    }
  }

  /**
   * Get beach recommendations based on weather
   */
  async getBeachRecommendations(island, date, time) {
    try {
      const response = await apiClient.get('/weather/recommendations', {
        params: { island, date, time },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to get recommendations');
    }
  }

  /**
   * Handle API errors
   */
  handleError(error, defaultMessage) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || error.response.data?.error || defaultMessage;
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Check your internet connection.');
    } else {
      // Something else went wrong
      return new Error(error.message || defaultMessage);
    }
  }
}

export default new BeachService();
