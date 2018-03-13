const MongoID = require('mongodb').ObjectId

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const co = require('co');

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = 'mongodb://localhost:27017/data-jour';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sendPost', (req, res) => {
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addPost = await db.collection('posts').insertOne(req.body);
        assert.equal(1, addPost.insertedCount);
        client.close()
    })
});

app.get('/api/getPost', (req, res) => {
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const postQuery = await db.collection('posts').find().sort({_id:-1}).skip(0).limit(5).toArray()
        client.close()

        res.send(postQuery);
    })
})

app.get('/api/postDetails',(req, res) => {
    const id = req.query.id
    console.log(id)
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour')
        const postDatails = await db.collection('posts').findOne({"_id": new ObjectID(id)})
        console.log(postDatails)
        client.close()

        res.send(postDetails)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));