// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController'); // Importa el controlador
const UserValidator = require('../validator/userValidator'); // Importa el validador

const router = express.Router(); // Crea un enrutador de Express que manejará las sub rutas específicas para la ruta /users
const userController = new UserController(); // Instancia el controlador de usuarios
const userValidator = new UserValidator(); // Instancia el validador de usuarios

// Define la ruta para obtener un usuario por ID.
router.get('/:id', userValidator.validateUserId(), (req, res) =>
  userController.getUser(req, res)
);

// Define la ruta para crear un nuevo usuario.
router.post('/', userValidator.validateUserData(), (req, res) =>
  userController.createUser(req, res)
);

// Define la ruta para actualizar un usuario por ID.
router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) =>
  userController.updateUser(req, res)
);

// Define la ruta para eliminar un usuario por ID.
router.delete('/:id', userValidator.validateUserId(), (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
