// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const productService = require('../services/productService.js');

class productController {
    constructor() {
        this.productService = new productService();
    }

    async getproduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getproductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createproduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.createproduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateproduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.updateproduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteproduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.deleteproduct(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(product);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchproducts(req, res) {
        try {
            const products = await this.productService.searchproductsByName(req.query.name);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = productController;