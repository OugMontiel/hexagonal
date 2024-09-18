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
// const { auth } = require('../../auth/application/middlewares/authenticateToken');
const {checkSession} = require('../middlewares/sessionLoging');

// Permitir conxiones de otros puertos
const cors = require('cors');

// configuracion para login
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const passportConfig = require('../../auth/infrastructure/passportConfig'); // Importa la configuración de Passport

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
      credentials: true, // Habilita el envío de cookies/credenciales
    })
  );

  // Configura la sesión
  app.use(
    session({
      secret: process.env.KEY_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { 
        httpOnly: true, // Evita que el cliente acceda a la cookie
        secure: false, // Debe estar en true en producción si usas HTTPS
        maxAge: parseInt(process.env.EXPRESS_EXPIRE), // Tiempo de vida de la cookie (ejemplo: 1 minuto)
        sameSite: 'None', // Permite compartir cookies entre diferentes dominios
      }
    })
  );

  // Inicializa Passport y maneja la sesión
  app.use(passport.initialize());
  app.use(passport.session());

  // Inicializacion de cookies 
  app.use(cookieParser());

  // Routes
  app.use('/auth', authRouter);
  app.use('/users', userRoutes);
  app.use('/producto', checkSession, productRoutes);

  return app;
};

module.exports = createServer;
