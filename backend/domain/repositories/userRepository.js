// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserRepository {
  async getByNickAndPassword(nick, password) {
    try {
      const user = new User();

      // Definimos el pipeline para la agregación
      let query = [
        {
          $match: { nick, password }, // Filtramos por nick y password
        },
        {
          $project: {
            _id: 0, // Excluimos el _id
            password: 0, // Excluimos el password del resultado
            email: 0, // Excluimos el email del resultado
            role: 0, // Excluimos el role del resultado
          },
        },
      ];

      // Ejecutamos la agregación en el modelo de usuario
      const result = await user.aggregate(query);

      // Devuelve el resultado si se encuentra, de lo contrario un error
      if (result.length === 0) {
        throw new Error(
          JSON.stringify({ status: 404, message: 'Invalid credentials' })
        );
      }

      return result[0]; // Retornamos el primer (y único) resultado
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 400, message: 'Error in user repository' })
      );
    }
  }
  async getNick(body) {
    try {
      const user = new User();
      let { nick } = body;
      let query = [
        {
          $match: { nick },
        },
        {
          $project: {
            _id: 0,
            role: 0,
            email: 0,
          },
        },
      ];
      return await user.aggregate(query);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 400, message: 'usuarios repository' })
      );
    }
  }
  async getPassword(passaword, user) {
    let { passaword: pass } = user;
    delete user.passaword;
    const isMatch = await bcrypt.compare(passaword, pass);
    if (!isMatch)
      throw new Error(
        JSON.stringify({ status: 401, message: 'No autorizzado' })
      );
    return jwt.sign(user, process.env.KEY_SECRET, {
      expiresIn: `${process.env.EXPRESS_EXPIRE}ms`,
    });
  }
  async getById(id) {
    try {
      const user = new User();
      return await user.findById(id);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 400, message: 'Error retrieving user' })
      );
    }
  }

  async save(userData) {
    try {
      const user = new User();
      return await user.insert(userData);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 500, message: 'Error saving user' })
      );
    }
  }

  async updateById(id, updateData) {
    try {
      const user = new User();
      // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
      return await user.findByIdAndUpdate(id, updateData, { upsert: true });
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 500, message: 'Error updating user' })
      );
    }
  }

  async deleteById(id) {
    try {
      const user = new User();
      return await user.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 404, message: 'Error deleting user' })
      );
    }
  }

  async searchByName(name) {
    try {
      return await User.find({ name: new RegExp(name, 'i') });
    } catch (error) {
      throw new Error('Error searching for users');
    }
  }
}

module.exports = UserRepository;
