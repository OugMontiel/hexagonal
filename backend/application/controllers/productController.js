// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const productService = require('../services/productService.js');

class productController {
  constructor() {
    this.productService = new productService();
  }

  // Obtener un producto por ID
  async getProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const product = await this.productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status || 500).json({ message: errorObj.message });
    }
  }

  // Crear un nuevo producto
  async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status || 500).json({ message: errorObj.message });
    }
  }

  // Actualizar un producto existente
  async updateProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const product = await this.productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status || 500).json({ message: errorObj.message });
    }
  }

  // Eliminar un producto
  async deleteProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const product = await this.productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // 204 No Content para indicar que el recurso ha sido eliminado sin contenido adicional.
      res.status(204).send();
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status || 500).json({ message: errorObj.message });
    }
  }

  // Buscar productos por nombre
  async searchProducts(req, res) {
    try {
      const products = await this.productService.searchProductsByName(
        req.query.name
      );
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = productController;
