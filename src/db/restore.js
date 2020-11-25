const { MongoClient } = require("mongodb");
const config = require('../config.json');

const client = new MongoClient(config.mongodb_url);

async function run() {
  try {
    await client.connect();
    await client.db("studay").command({ ping: 1 });
    console.log("Connected successfully to server");
    const db = client.db('studay');

    // Collections
    const users = db.collection('users');
    const organizations = db.collection('organizations');
    const members = db.collection('members');

    try {
      await users.drop();
    } catch (error) {}
    try {
      await organizations.drop();
    } catch (error) {}
    try {
      await members.drop();
    } catch (error) {}

    const schoolId = (
      await organizations.insertOne({
        name: "School 13",
        description: "School of Hell"
      })
    ).insertedId;
    

    // insert
    const m1 = await members.insertOne({
      firstName: 'Ольга',
      middleName: 'Якось',
      lastName: 'Кузьмівна',
      organization: schoolId,
      role: 'admin'
    });
    const m2 = await members.insertOne({
      firstName: 'Марія',
      middleName: 'Василівна',
      lastName: 'Забув',
      organization: schoolId,
      role: 'teacher'
    });
    const m3 = await members.insertOne({
      firstName: 'Наталія',
      middleName: 'Василівна',
      lastName: 'Лакуста',
      organization: schoolId,
      role: 'teacher'
    });

    const res = await organizations.findOneAndUpdate({_id: schoolId}, {
      $set: {
        members: {
          [m1.insertedId]: 'admin',
          [m2.insertedId]: 'teacher',
          [m3.insertedId]: 'teacher',
        }
      }
    });
    console.log('res', res);


    console.log('Restore finished')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);