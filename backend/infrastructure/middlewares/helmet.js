const helmet = require('helmet');

// Configuración de Content Security Policy (CSP) que permite cargar recursos de tu dominio y del frontend
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Permite cargar recursos de tu propio dominio
      scriptSrc: ["'self'", 'http://localhost:5173'], // Permite cargar scripts desde el dominio del frontend
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'http://localhost:5173',
      ], // Permite cargar estilos de Google Fonts y del frontend
      fontSrc: ["'self'", 'https://fonts.gstatic.com'], // Permite cargar fuentes de Google Fonts
      connectSrc: ["'self'", 'http://localhost:5173'], // Permite conexiones a tu frontend
      imgSrc: ["'self'", 'data:', 'http://localhost:5173'], // Permite cargar imágenes del frontend
      objectSrc: ["'none'"], // Deshabilita el uso de <object>, <embed>, <applet>
      upgradeInsecureRequests: [], // Permite actualizar solicitudes inseguras a seguras (opcional)
    },
  },
});

module.exports = helmetMiddleware;
