const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database and Collection Name
const dbName = 'MealDB';
const collectionName = 'Meals';

const referenceCollection = [
  {
    _id: "665ea2fd1a06a1981e851f09",
    name: "Cloud Cuisine",
    password: "cloud@123"
  },
  {
    _id: "665ea2fe1a06a1981e851f0a",
    name: "Veggie Box",
    password: "veggie@456"
  },
  {
    _id: "665ea2fe1a06a1981e851f0b",
    name: "Pixler Café",
    password: "pixler@789"
  },
  {
    _id: "665ea2fe1a06a1981e851f0c",
    name: "Net Snacks",
    password: "snacks@123"
  },
  {
    _id: "665ea2fe1a06a1981e851f0d",
    name: "Celestial Feast",
    password: "clestial@456"
  }
];

async function updateDocuments() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve 180 documents
    const documents = await collection.find().limit(180).toArray();

    // Update each document with available set to true
    const bulkOps = documents.map(doc => {
      const kitchenRef = referenceCollection.find(ref => ref.name === doc.kitchen);
      const updateFields = { available: true };
      if (kitchenRef) {
        updateFields.kitchenId = new ObjectId(kitchenRef._id);
      }
      return {
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: updateFields }
        }
      };
    });

    // Execute bulk update
    if (bulkOps.length > 0) {
      const result = await collection.bulkWrite(bulkOps);
      console.log(`Updated ${result.modifiedCount} documents`);
    } else {
      console.log('No documents to update');
    }
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
  }
}

updateDocuments();
