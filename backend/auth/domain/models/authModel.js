const { ObjectId } = require('mongodb');
const ConnectToDatabase = require('../../../infrastructure/database/mongodb');
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class Auth {
  async aggregate(data) {
    let obj = ConnectToDatabase.instanceConnect;
    const collection = obj.db.collection('cliente');
    // console.log('querry: ',[...data]);
    const res = await collection.aggregate([...data]).toArray();
    // console.log(res);
    return res;
  }
}

module.exports = Auth;
