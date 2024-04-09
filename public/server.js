var express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express()
const url =
  ""
var port = process.env.port || 3000;
let collection;
app.use(express.static(__dirname + '/public'))
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
    // connect the client to the server (optional starting in v4.7)
    await client.connect();
    collection = client.db().collection('Cars');
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}
app.get('/', (req, res) => {
  res.render('index.html');
});
app.get('/api/cards', (req, res) => {
  getAllCars((err, result) => {
    if (!err) {
      res.json({ statusCode: 200, data: result, message: "Managed to get all Cars!" })
    }
  });
});

app.post('/api/Cars', (req, res) => {
  let Cars = req.body;
  postCars(Cars, (err, result) => {
    if (err) {
      res.json({ statusCode: 200, data: result, message: 'success' })
    }
  });
});

function postCars(Cars, callback) {
  collection.insertOne(Cars, callback);

}

function getAllCars(callback) {
  collection.find({}).toArray(callback);
}

app.listen(3000, () => {
  console.log('express server started on port 3000');
  runDBConnection();
})