// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const session = require('express-session');

// Carga de otro Routers
const authRouter = require('../../auth/application/routes/authRouter');
const userRoutes = require('../../user/application/routes/userRoutes');
const productRoutes = require('../../product/application/routes/productRoutes');

// carga de middlewares
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const { auth } = require('../../auth/application/middlewares/authenticateToken');
const sessionAuth = require('../../auth/application/middlewares/sessionLogin');

// Permitir conxiones de otros puertos
const cors = require('cors');

// configuracion para passport
const passport = require('passport');
const passportConfig = require('../../auth/infrastructure/passportConfig'); // Importa la configuración de Passport

// crear servidor
const createServer = () => {
  const app = express();
  app.use(express.json());

  // middlewares
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

  // Configura la sesión
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true }
    })
  );

  // Inicializa Passport y maneja la sesión
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  app.use('/auth', authRouter);
  app.use('/users', userRoutes);
  app.use('/producto', sessionAuth, auth, productRoutes);

  return app;
};

module.exports = createServer;
