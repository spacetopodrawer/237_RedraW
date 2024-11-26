{
    "name": "gnss-post-process",
    "version": "1.0.0",
    "description": "Application de post-traitement GNSS multiplateforme",
    "type": "module",
    "scripts": {
      "start": "node src/index.js",
      "dev:server": "node --watch src/index.js",
      "dev:client": "vite",
      "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
      "build": "vite build",
      "preview": "vite preview"
    },
    "keywords": [
      "gnss",
      "post-processing",
      "rinex"
    ],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "multer": "^1.4.5-lts.1",
      "morgan": "^1.10.0",
      "vite": "^5.0.0",
      "concurrently": "^8.2.2"
    },
    "devDependencies": {
      "@types/node": "^20.10.0",
      "@types/express": "^4.17.21",
      "@types/cors": "^2.8.17",
      "@types/multer": "^1.4.11",
      "@types/morgan": "^1.9.9"
    }
  }