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
    console.log(req.body);
    const requests = req.body
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const r = await db.collection('posts').insertOne(req.body);
        assert.equal(1, r.insertedCount);
        db.close()
    })
});

// app.get('/api/getPost', (req, res) => {
    
// })

app.listen(port, () => console.log(`Listening on port ${port}`));