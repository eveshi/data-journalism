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

app.post('/api/postdata', (req, res) => {
    console.log(req.body);
    const requests = req.body
    co(function*(){
        const client = yield MongoClient.connect(mongoUrl);
        console.log("Connected correctly to server");
        
        const db = client.db('data-jour')      
        const r = yield db.collection('posts').insertOne(req.body);
        assert.equal(1, r.insertedCount);
        client.close()
    }).catch(function(err) {
        console.log(err.stack);
      });
    // MongoClient.connect(mongoUrl, (err, client) => {
    //     const db = client.db('data-jour');
    //     const r = db.collection('posts').insertOne(req.body);
    //     // assert.equal(1, r.insertedCount);
    //     db.close()
    // }).catch((err) => {
    //     console.log(err.stack)
    // })
});

app.get('/api/test', (req, res) => {
    res.send('ok?')
})

app.listen(port, () => console.log(`Listening on port ${port}`));