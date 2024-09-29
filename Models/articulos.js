const { MongoClient, ObjectId } = require('mongodb');
const { client } = require('../DB/db');

async function createArticle(article) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const articleCollection = database.collection('articleCollection');
        const result = await articleCollection.insertOne(article);
        return result.insertedId;
    } finally {
        await client.close();
    }
}
async function getArticle() {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const articleCollection = database.collection('articleCollection');
        return await articleCollection.find({}).toArray(); // Sin filtro
    } finally {
        await client.close();
    }
}

async function updateArticle(articleId, updatedArticle) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const articleCollection = database.collection('articleCollection');
        const result = await articleCollection.updateOne(
            { _id: new ObjectId(articleId) },
            { $set: updatedArticle }
        );
        return result.modifiedCount;
    } finally {
        await client.close();
    }
}
async function deleteArticle(articleId) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const articleCollection = database.collection('articleCollection');
        const result = await articleCollection.deleteOne({ _id: new ObjectId(articleId) });
        return result.deletedCount;
    } finally {
        await client.close();
    }
}

module.exports = { createArticle, getArticle, updateArticle, deleteArticle };