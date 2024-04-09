const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const url = "mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Add your MongoDB connection URL
const port = process.env.PORT || 3000;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('Test.Cars');
    console.log("Connected to MongoDB");
  } catch (ex) {
    console.error(ex);
  }
}

app.get('/api/cards', (req, res) => {
  getAllCars((err, result) => {
    if (!err) {
      res.json({ statusCode: 200, data: result, message: "Managed to get all Cars!" });
    } else {
      res.status(500).json({ statusCode: 500, message: "Failed to get all Cars", error: err });
    }
  });
});

app.post('/api/Test.Cars', (req, res) => {
  let Cars = req.body;
  postCars(Cars, (err, result) => {
    if (!err) {
      res.status(201).json({ statusCode: 201, data: result, message: 'Cars added successfully' });
    } else {
      res.status(500).json({ statusCode: 500, message: 'Failed to add Cars', error: err });
    }
  });
});

function postCars(Cars, callback) {
  collection.insertOne(Cars, callback);
}

function getAllCars(callback) {
  collection.find({}).toArray(callback);
}

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Insert the form data into the MongoDB collection
  collection.insertOne(formData)
    .then(result => {
      console.log('Form data inserted:', result);
      res.status(200).send('Form data inserted successfully');
    })
    .catch(err => {
      console.error('Error inserting form data:', err);
      res.status(500).send('Error inserting form data');
    });
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
  runDBConnection();
});
