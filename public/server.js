require('dotenv').config()
var express = require("express")
var app = express()
var cors = require("cors")
const MongoClient = require('mongodb').MongoClient;
let projectCollection;

// Database Connection

const uri = "mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/Test/Cars";
const client = new MongoClient(uri,{ useNewUrlParser: true })


app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const createColllection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}


app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

app.post('/api/projects',(req,res) => {
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

var port = process.env.port || 8888;

app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
    createColllection("pets")
})
