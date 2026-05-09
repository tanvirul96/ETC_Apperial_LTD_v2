import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple in-memory cache for GET requests
const cache = new Map();
const CACHE_TTL = 30000; // 30 seconds

// Add a request interceptor to include the auth token and check cache
api.interceptors.request.use(
  (config) => {
    // Add token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Cache control logic: Only cache GET requests
    if (config.method === 'get') {
      const cacheKey = config.url + (config.params ? JSON.stringify(config.params) : '');
      const cached = cache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        // Resolve from local in-memory cache immediately
        config.adapter = () => {
          return Promise.resolve({
            data: cached.data,
            headers: config.headers,
            config: config,
            status: 200,
            statusText: 'OK'
          });
        };
      }
    } else if (['post', 'put', 'delete'].includes(config.method)) {
      // Invalidate the cache completely on mutations
      cache.clear();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to populate the cache
api.interceptors.response.use(
  (response) => {
    const config = response.config;
    // Store only GET requests with 200 status in cache
    if (config.method === 'get' && response.status === 200) {
      const cacheKey = config.url + (config.params ? JSON.stringify(config.params) : '');
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
