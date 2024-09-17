// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  // Controlador: Maneja el inicio de sesión mediante cookies
  async sessionLogin(req, res) {
    try {
      // Verificación de errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Busca el usuario en la base de datos por nick, password y email
      const auth = await this.authService.getauthByNickPasswordAndEmail(
        req.body.nick,
        req.body.password,
        req.body.email
      );

      if (!auth) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generar token JWT
      const token = jwt.sign({ nick: req.body.nick }, 'clave', {
        expiresIn: '60s',
      });

      // Establecer la cookie con el token JWT
      res.cookie('authToken', `Bearer ${token}`, {
        httpOnly: true,
        secure: true , // Cambia a true en producción con HTTPS
        sameSite: 'None', // Necesario para trabajar en entornos cross-origin
      });

      // Enviar respuesta de éxito con el token
      res.status(201).json({ token });
    } catch (error) {
      // Manejar errores de autenticación
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }
}

module.exports = AuthController;
