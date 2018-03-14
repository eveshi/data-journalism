const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const MongoID = require('mongodb').ObjectId;
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

        const postQuerySorted = postsSorted(postQuery)
        res.send(postQuerySorted);
    })
})

app.get('/api/postDetails',(req, res) => {
    const id = req.query.id
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour')
        const postsDetails = await db.collection('posts').findOne({_id: MongoID(id)}).toArray()
        client.close()

        const postObject = []
        postsDetails.forEach(element => {
            postObject.push(element)
        });
        console.log(postObject)
        const postContent = postsSorted(postsDetails)

        console.log(postContent)

        res.send(postContent)
    })
})

app.post('/api/sendComment', (req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        console.log(id)
        console.log(req.body)
        const sendComment = await db.collection('posts').update(
            {_id: MongoID(id)},
            {
                $set:{comment}
            },
            {upsert: true}
        )

        client.close()
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

const postsSorted = (postsUnsorted) => {
    let postsSorted = []
    postsUnsorted.map((el,index) => {
        const mainContent = el['mainContent']
        const dateUpload = mainContent['date'];
        const dateNow = Date.now();
        const datePassed = ((dateNow - dateUpload)/1000).toFixed(0);
        let datePassedString = '';
        if (datePassed < 60){
            datePassedString = datePassed + '秒'
        }else if(datePassed < 60*60){
            datePassedString = (datePassed/60).toFixed(0) + '分'
        }else if(datePassed < 60*60*24){
            datePassedString = (datePassed/(60*60)).toFixed(0) + '小时'
        }else if(datePassed < 60*60*24*30){
            datePassedString = (datePassed/(60*60*24)).toFixed(0) + '天'
        }else if(datePassed < 60*60*24*365){
            datePassedString = (datePassed/(60*60*24*30)).toFixed(0) + '月'
        }else{
            datePassedString = (datePassed/(60*60*24*365)).toFixed(0) + '年'
        }
        const postElement = {
            key: el['_id'],
            userProfile: mainContent['userProfile'],
            userName: mainContent['user'],
            title: mainContent['title'],
            content: mainContent['content'],
            time: datePassedString,
            commentNumber: 0,
        }
        postsSorted.push(postElement)
    })
    return postsSorted
}