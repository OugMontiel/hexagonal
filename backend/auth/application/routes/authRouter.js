const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/authController'); // Importa el controlador de autenticación.
const AuthValidator = require('../validator/authValidator'); 

// enrutador de Express para manejar las rutas específicas de autenticación.
const router = express.Router();
const authController = new AuthController();
const authValidator = new AuthValidator();

// Define la ruta para iniciar sesión mediante sesión Express.
router.post('/sessionLogin', authValidator.validatorSessionLogin(), (req, res) =>
    authController.sessionLogin(req, res)
);

// Ruta para iniciar sesión con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/'); // Redirige a la página principal o donde desees
});

// Ruta para iniciar sesión con Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/'); // Redirige a la página principal o donde desees
});

// Ruta para iniciar sesión con Discord
router.get('/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));
router.get('/discord/callback', passport.authenticate('discord'), (req, res) => {
  res.redirect('/'); // Redirige a la página principal o donde desees
});

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
