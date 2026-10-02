// In-memory cache store
const cache = new Map();

const TTL_MS = 60 * 1000;


function cacheMiddleware(req, res, next) {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const now = Date.now();

  if (cache.has(key)) {
    const entry = cache.get(key);
    const age = now - entry.createdAt;


    if (age <= TTL_MS) {

      res.set('X-Cache', 'HIT');
      return res.json(entry.data);
    }


    cache.delete(key);
  }


  res.set('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (body) => {

    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        data: body,
        createdAt: Date.now()
      });
    }
    return originalJson(body);
  };

  next();
}


function clearCache() {
  cache.clear();
}


function invalidateCacheMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  const invalidateIfSuccessful = () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache();
    }
  };

  res.json = function (body) {
    invalidateIfSuccessful();
    return originalJson(body);
  };

  res.send = function (body) {
    invalidateIfSuccessful();
    return originalSend(body);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  invalidateCacheMiddleware,
  clearCache,
  cache,
  TTL_MS
};
