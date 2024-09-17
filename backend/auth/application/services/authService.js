// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const AuthRepository = require('../../domain/repositories/authRepository');

class authService {
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async getauthByNickPasswordAndEmail(nick, password, email) {
    // Lógica para obtener el usuario desde el repositorio con las tres credenciales
    const auth = await this.authRepository.getNickByNickPasswordAndEmail(nick, password, email);
  
    if (!auth) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: 'auth not found or invalid credentials',
        })
      );
    }

    return auth.nick; // Devuelve el nickname si las credenciales son correctas
  }  
}

module.exports = authService;
