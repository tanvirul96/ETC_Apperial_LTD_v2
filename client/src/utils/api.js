import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple in-memory cache for GET requests
const cache = new Map();
const CACHE_TTL = 30000; // 30 seconds

export const clearApiCache = () => cache.clear();

// Add a request interceptor to include auth token and clear cache on mutations
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = (config.method || 'get').toLowerCase();

    // Invalidate the cache on mutation requests
    if (['post', 'put', 'delete', 'patch'].includes(method)) {
      cache.clear();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to store successful GET responses in cache
api.interceptors.response.use(
  (response) => {
    const config = response.config;
    const method = (config.method || 'get').toLowerCase();
    if (method === 'get' && response.status === 200) {
      const cacheKey = config.url + (config.params ? JSON.stringify(config.params) : '');
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Safely intercept GET calls at the method level without mutating Axios config.adapter
const originalGet = api.get;
api.get = function (url, config = {}) {
  const cacheKey = url + (config.params ? JSON.stringify(config.params) : '');
  const cached = cache.get(cacheKey);

  if (!config.bypassCache && cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return Promise.resolve({
      data: cached.data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  }

  return originalGet.call(this, url, config);
};

export default api;
