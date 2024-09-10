const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");

class productModel {
    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const [res] = await collection.find({ _id: new ObjectId(id) }).toArray();
        return res;
    }

    async insert(productData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.insertOne(productData);
        return res;
    }

    async findByIdAndUpdate(id, updateData, upsert) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { upsert: upsert }
        );
        return res;
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.deleteOne({ _id: new ObjectId(id) });
        return res;
    }
}

module.exports = productModel;