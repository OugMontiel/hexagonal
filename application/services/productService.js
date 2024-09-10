// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const productRepository = require('../../domain/repositories/productRepository.js');

class productService {
    constructor() {
        this.productRepository = new productRepository();
    }

    async getproductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found'}));
        }
        return product;
    }

    async createproduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.productRepository.save(data);
    }

    async updateproduct(id, data) {
        const updatedproduct = await this.productRepository.updateById(id, data);
        if (!updatedproduct) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found or could not be updated'}));
        }
        return updatedproduct;
    }

    async deleteproduct(id) {
        const deletedproduct = await this.productRepository.deleteById(id);
        if (!deletedproduct) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found or could not be deleted'}));
        }        
        return deletedproduct;
    }
    
    async searchproductsByName(name) {
        return await this.productRepository.searchByName(name);
    }
}

module.exports = productService;