// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const Auth = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authRepository {
  // Método en el repositorio para obtener un usuario basado en su 'nick', 'password' y 'email'
  async getNickByNickPasswordAndEmail(nick, password, email) {
    try {
      const auth = new Auth(); // Creamos una nueva instancia del modelo Auth para realizar consultas a la base de datos

      // Definimos el pipeline para la agregación. Esto nos permite ejecutar operaciones más complejas en MongoDB.
      let query = [
        {
          // Filtramos por los tres valores: nick, password, email
          $match: { nick, password, email },
        },
      ];

      // Ejecutamos el pipeline de agregación en el modelo Auth
      const result = await auth.aggregate(query);

      // Validamos si el resultado está vacío (es decir, no se encontró ningún usuario con las credenciales dadas)
      // console.log('resultado Encontrado', result.length);
      if (result.length === 0) {
        // Si no se encontró ningún usuario, lanzamos un error con el mensaje 'Invalid credentials'
        throw new Error(
          JSON.stringify({ status: 404, message: 'Invalid credentials' })
        );
      }
      // console.log(result[0]);
      // Si se encontró un usuario, devolvemos el primer (y único) resultado en el array
      return result[0];
    } catch (error) {
      // Si el error contiene 'Invalid credentials', es un error específico de credenciales incorrectas, así que lo relanzamos
      if (error.message.includes('Invalid credentials')) {
        throw error; // Re-lanzamos el error original
      } else {
        // Si ocurre otro tipo de error, lanzamos uno genérico
        throw new Error(
          JSON.stringify({ status: 400, message: 'Error in auth repository' })
        );
      }
    }
  }
  async getUserByEmail(email) {
    try {
      const auth = new Auth(); // Instancia del modelo Auth para acceder a la base de datos.

      // Definimos el pipeline para la agregación.
      let query = [
        {
          // Filtramos por email
          $match: { email },
        },
      ];

      // Ejecutamos el pipeline de agregación en el modelo Auth.
      const result = await auth.aggregate(query);

      // Si se encontró un usuario, devolvemos el primer (y único) resultado en el array.
      return result[0];
    } catch (error) {
      // Si el error ya tiene un mensaje específico, lo relanzamos.
      if (error.message.includes('Email user not found')) {
        throw error; // Re-lanzamos el error original.
      } else {
        // Si ocurre otro tipo de error, lanzamos uno genérico.
        throw new Error(
          JSON.stringify({ status: 400, message: 'Error in auth repository' })
        );
      }
    }
  }
}

module.exports = authRepository;
