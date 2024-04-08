var express = require("express")
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cardList = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2"
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3"
  }
]
app.get('/api/projects', (req, res) => {
  res.json({ statusCode: 200, data: cardList, message: "Success" })
})
var port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App listening to: " + port)
})

// Require the MongoDB client
const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:3000';
const dbName = 'mydatabase';

// Connect to the MongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if(err) {
        console.error('Error occurred while connecting to MongoDB:', err);
        return;
    }
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection('mycollection');

    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        if(err) {
            console.error('Error occurred while fetching documents:', err);
            return;
        }
        console.log('Found the following documents:');
        console.log(docs);
        
        // Close the client connection
        client.close();
    });
});
