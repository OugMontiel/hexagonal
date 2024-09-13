// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.get('/:id', userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
// router.get('/search', (req, res) => userController.searchUsers(req, res)); // De momento aun no se configura esta peticcion, fue proporcionada por el docente y no se entiende bien a que hace referencia ni cual es el objetivo 

router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));

router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));

router.delete('/:id', userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));


module.exports = router;