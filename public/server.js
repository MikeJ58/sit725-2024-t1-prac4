var express = require("express")
var app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')
const path = require("path");
var cors = require("cors")
var port = process.env.port || 3000;
let collection;
require('dotenv').config()

// Database Connection

const uri = "mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/Cars";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });
app.use(express.static(path.join(__dirname+'/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Test');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

app.get('/', (req, res) => {
    res.render('/public/index.html');
});


app.get('/api/cars',(req,res) => {
    getProjects((err,result) => {
        if(!err) {
            res.json({statusCode: 400, data: result, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

app.post('/api/cars',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
        }
    })
})

function postCars(cars, callback) {
    collection.insertOne(cars, callback);
}

function getAllCars(callback) {
    collection.find({}).toArray(callback);
}

app.listen(3000, ()=>{
    console.log("Express server started");
    runDBConnection();
})
