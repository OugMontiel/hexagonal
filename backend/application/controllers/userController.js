// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.getNicknameByNickAndPassword(
        req.body.nick,
        req.body.password
      );
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ nick: req.body.nick }, 'clave', {
        expiresIn: '60s',
      });

      // Establecer la cookie con el token JWT
      res.cookie('authToken', `Bearer ${token}`, { httpOnly: true });

      // Enviar respuesta de éxito con la información del usuario
      res.status(201).json({ token });
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async getUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const user = await this.userService.deleteUser(req.params.id);
      // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
      res.status(204).json(user);
      // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
      // res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }
  async verifyUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const token = await this.userService.getUserbyNickAndPassword(res.body);
      req.session.token = `Bearer ${token}`;
      res.status(200).json(token);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async searchUsers(req, res) {
    try {
      const users = await this.userService.searchUsersByName(req.query.name);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
