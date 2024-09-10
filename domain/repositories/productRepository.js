// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const product = require('../models/productModel.js');

class productRepository {
    async getById(id) {
        try {
            const product = new product();
            return await product.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving product'}));
        }
    }

    async save(productData) {
        try {
            const product = new product();
            return await product.insert(productData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving product'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const product = new product();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await product.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating product'}));
        }
    }

    async deleteById(id) {
        try {
            const product = new product();
            return await product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting product'}));
        }
    }

    async searchByName(name) {
        try {
            return await product.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for products');
        }
    }
}

module.exports = productRepository;