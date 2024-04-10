const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Database Connection
const uri = "mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/Test"; // Set your MongoDB URI here
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
let collection;

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Database connection
async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db('Test').collection('Cars');
        console.log("Database connected successfully");
    } catch (ex) {
        console.error("Error connecting to the database:", ex);
    }
}

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get all cars
app.get('/api/cars', (req, res) => {
    getAllCars((err, result) => {
        if (err) {
            res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: err });
        } else {
            res.status(200).json({ statusCode: 200, message: "Success", data: result });
        }
    });
});

// API endpoint to add a new car
app.post('/api/cars', (req, res) => {
    let car = req.body;
    postCar(car, (err, result) => {
        if (err) {
            res.status(400).json({ statusCode: 400, message: "Bad Request", error: err });
        } else {
            res.status(201).json({ statusCode: 201, message: "Car added successfully", data: result });
        }
    });
});

// Function to add a new car
function postCar(car, callback) {
    collection.insertOne(car, callback);
}

// Function to get all cars
function getAllCars(callback) {
    collection.find({}).toArray(callback);
}

// Start the server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
    runDBConnection();
});
