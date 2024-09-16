// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes');
const productRoutes = require('../../application/routes/productRoutes');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const { auth } = require('../../application/middlewares/authenticateToken');
const sessionAuth = require('../../application/middlewares/sessionLogin');
const cors = require('cors');

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(jsonParseErrorHandler);
  app.use(limiTotal);
  
  // Configuración de CORS
  app.use(
    cors({
      origin: 'http://localhost:5173', // Origen permitido
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use('/users', userRoutes);
  app.use('/producto', sessionAuth, auth, productRoutes);
  return app;
};

module.exports = createServer;
