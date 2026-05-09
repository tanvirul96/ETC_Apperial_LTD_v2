const cache = new Map();

/**
 * Express caching middleware for GET requests.
 * @param {number} durationInSeconds - Cache duration in seconds.
 */
const cacheMiddleware = (durationInSeconds = 30) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            // Invalidate complete cache on state mutations (POST, PUT, DELETE)
            if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                cache.clear();
            }
            return next();
        }

        const key = req.originalUrl || req.url;
        const cachedResponse = cache.get(key);

        if (cachedResponse && (Date.now() - cachedResponse.timestamp < durationInSeconds * 1000)) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedResponse.data);
        }

        // Intercept res.json to store response in memory
        const originalJson = res.json;
        res.json = function (body) {
            if (res.statusCode === 200) {
                cache.set(key, {
                    data: body,
                    timestamp: Date.now()
                });
            }
            res.setHeader('X-Cache', 'MISS');
            return originalJson.call(this, body);
        };

        next();
    };
};

/**
 * Forcefully clear the in-memory API response cache.
 */
const clearApiCache = () => {
    cache.clear();
};

module.exports = { cacheMiddleware, clearApiCache };
