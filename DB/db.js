const  { MongoClient } = require('mongodb');
const url = "mongodb+srv://adrian22aboitesbarco:2jcGNeoQdezGryUA@cluster0.g0lzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0s";
const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("conectado a MongoDB");
    }  catch (err) {
        console.error(err);
    }
}
module.exports = { connectDB, client };