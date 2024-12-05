export const constants = {
    JWT: {
      EXPIRES_IN: '24h',
      ALGORITHM: 'HS256',
    },
    API: {
      PREFIX: process.env.API_PREFIX || '/api/v1',
      VERSIONS: ['v1'],
    },
    CORS: {
      ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
      METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    UPLOADS: {
      MAX_SIZE: 10 * 1024 * 1024, // 10MB
      ALLOWED_TYPES: [
        'application/json',
        'application/geo+json',
        'application/x-rinex',
        'application/octet-stream',
      ],
    },
  };