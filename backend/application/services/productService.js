// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const productRepository = require('../../domain/repositories/productRepository.js');

class productService {
    constructor() {
        this.productRepository = new productRepository();
    }

    // Obtener producto por ID
    async getProductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' }));
        }
        return product;
    }

    // Crear un nuevo producto
    async createProduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.productRepository.save(data);
    }

    // Actualizar un producto existente
    async updateProduct(id, data) {
        const updatedProduct = await this.productRepository.updateById(id, data);
        if (!updatedProduct) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be updated' }));
        }
        return updatedProduct;
    }

    // Eliminar un producto
    async deleteProduct(id) {
        const deletedProduct = await this.productRepository.deleteById(id);
        if (!deletedProduct) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be deleted' }));
        }
        return deletedProduct;
    }

    // Buscar productos por nombre
    async searchProductsByName(name) {
        return await this.productRepository.searchByName(name);
    }
}

module.exports = productService;
