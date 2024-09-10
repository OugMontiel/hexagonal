// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const productModel = require('../models/productModel.js');

class productRepository {
    // Obtener producto por ID
    async getById(id) {
        try {
            return await productModel.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving product' }));
        }
    }

    // Guardar un nuevo producto
    async save(productData) {
        try {
            const product = new productModel(productData);
            return await product.save();
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving product' }));
        }
    }

    // Actualizar producto por ID
    async updateById(id, updateData) {
        try {
            return await productModel.findByIdAndUpdate(id, updateData, { new: true, upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating product' }));
        }
    }

    // Eliminar producto por ID
    async deleteById(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting product' }));
        }
    }

    // Buscar productos por nombre
    async searchByName(name) {
        try {
            return await productModel.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error searching for products' }));
        }
    }
}

module.exports = productRepository;
