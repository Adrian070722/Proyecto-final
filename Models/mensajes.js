const { MongoClient, ObjectId } = require('mongodb');
const { client } = require('../DB/db');

async function createMensajes(mensajes) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const mensajesCollection = database.collection('mensajesCollection');
        const result = await mensajesCollection.insertOne(mensajes);
        return result.insertedId;
    } finally {
        await client.close();
    }
}
async function getMensajes() {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const mensajesCollection = database.collection('mensajesCollection');
        return await mensajesCollection.find({}).toArray(); // Sin filtro
    } finally {
        await client.close();
    }
}

async function updateMensajes(mensajesId, updatedMensajes) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const mensajesCollection = database.collection('mensajesCollection');
        const result = await mensajesCollection.updateOne(
            { _id: new ObjectId(mensajesId) },
            { $set: updatedMensajes }
        );
        return result.modifiedCount;
    } finally {
        await client.close();
    }
}
async function deleteMensajes(mensajesId) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const mensajesCollection = database.collection('mensajesCollection');
        const result = await mensajesCollection.deleteOne({ _id: new ObjectId(mensajesId) });
        return result.deletedCount;
    } finally {
        await client.close();
    }
}

module.exports = { createMensajes, getMensajes, updateMensajes, deleteMensajes };