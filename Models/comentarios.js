const { MongoClient, ObjectId } = require('mongodb');
const { client } = require('../DB/db');

async function createComentarios(comentarios) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const comentariosCollection = database.collection('comentariosCollection');
        const result = await comentariosCollection.insertOne(comentarios);
        return result.insertedId;
    } finally {
        await client.close();
    }
}
async function getComentarios() {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const comentariosCollection = database.collection('comentariosCollection');
        return await comentariosCollection.find({}).toArray(); // Sin filtro
    } finally {
        await client.close();
    }
}

async function updateComentarios(comentariosId, updatedComentarios) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const comentariosCollection = database.collection('comentariosCollection');
        const result = await comentariosCollection.updateOne(
            { _id: new ObjectId(comentariosId) },
            { $set: updatedComentarios }
        );
        return result.modifiedCount;
    } finally {
        await client.close();
    }
}
async function deleteComentarios(comentariosId) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const comentariosCollection = database.collection('comentariosCollection');
        const result = await comentariosCollection.deleteOne({ _id: new ObjectId(comentariosId) });
        return result.deletedCount;
    } finally {
        await client.close();
    }
}

module.exports = { createComentarios, getComentarios, updateComentarios, deleteComentarios };