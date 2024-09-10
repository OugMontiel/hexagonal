// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const productController = require('../controllers/productController.js');
const productValidator = require('../validator/productValidator');

const router = express.Router();
const productController = new productController();
const productValidator = new productValidator();

router.get('/:id', productValidator.validateproductId(), (req, res) => productController.getproduct(req, res));
router.post('/', productValidator.validateproductData(), (req, res) => productController.createproduct(req, res));
router.put('/:id', productValidator.validateproductUpdateDataById(), (req, res) => productController.updateproduct(req, res));
router.delete('/:id', productValidator.validateproductId(), (req, res) => productController.deleteproduct(req, res));
router.get('/search', (req, res) => productController.searchproducts(req, res));


module.exports = router;