const { MongoClient } = require("mongodb");
const config = require('../config.json');

const client = new MongoClient(config.mongodb_url);

async function run() {
  try {
    await client.connect();
    const database = client.db('schooldly');
    const collection = database.collection('users');
    
    const QUERY = { uid: null };
    const UPDATE = {
      uid: null
    }

    const documents = await collection.find(QUERY);
    documents.forEach(async (doc) => {
      await collection.updateOne(
        { _id: doc._id }, 
        {
          $set: UPDATE
        }
      );
      console.log('count', doc);
    });
    console.log('count', await organizations.count());

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);