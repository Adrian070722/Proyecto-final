const { MongoClient, ObjectId } = require('mongodb');
const { client } = require('../DB/db');

async function createFaqs(faqs) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const faqsCollection = database.collection('faqsCollection');
        const result = await faqsCollection.insertOne(faqs);
        return result.insertedId;
    } finally {
        await client.close();
    }
}
async function getFaqs() {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const faqsCollection = database.collection('faqsCollection');
        return await faqsCollection.find({}).toArray(); // Sin filtro
    } finally {
        await client.close();
    }
}

async function updateFaqs(faqsId, updatedFaqs) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const faqsCollection = database.collection('faqsCollection');
        const result = await faqsCollection.updateOne(
            { _id: new ObjectId(faqsId) },
            { $set: updatedFaqs }
        );
        return result.modifiedCount;
    } finally {
        await client.close();
    }
}
async function deleteFaqs(faqsId) {
    try {
        await client.connect();
        const database = client.db('Proyecto-final');
        const faqsCollection = database.collection('faqsCollection');
        const result = await faqsCollection.deleteOne({ _id: new ObjectId(faqsId) });
        return result.deletedCount;
    } finally {
        await client.close();
    }
}

module.exports = { createFaqs, getFaqs, updateFaqs, deleteFaqs };