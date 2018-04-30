const express = require('express');
const cors = require('cors');
let bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const MongoID = require('mongodb').ObjectId;
const mongooseModel = require('../models/user')

const assert = require('assert');
const co = require('co');

const app = express();
console.log('PORT:', process.env.PORT);
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/build'));
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

app.post('/api/sendLesson',(req,res) => {
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addLesson = await db.collection('lessons').insertOne(req.body);
        assert.equal(1,addLesson.insertedCount)
        client.close()
    })
});

app.get('/api/getPost', (req, res) => {
    const page = req.query.page
    const itemInEveryPage = req.query.itemInEveryPage
    const limit = parseInt(itemInEveryPage)
    const skip = (page-1)*itemInEveryPage
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const postQuery = await db.collection('posts').find().sort({_id:-1}).skip(skip).limit(limit).toArray()
        const totalNumber = await db.collection('posts').count()

        client.close()

        let postContentArray = []
        postQuery.map((el) => {
            const id = el._id
            const newObject = {
                id: id, 
                ...el.mainContent
            }
            postContentArray.push(newObject)
        })
        const postSentBack = postsSorted(postContentArray)
        const dataSentBack = {
            postSentBack,
            totalNumber: totalNumber
        }
        res.send((dataSentBack));
    })
})

app.get('/api/postDetails',(req, res) => {
    const id = req.query.id
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour')
        const postsDetails = await db.collection('posts').findOne({_id: MongoID(id)})
        client.close()

        let objectArray = []
        Object.keys(postsDetails).forEach((key) => {
            objectArray.push(postsDetails[key])
            if(postsDetails[key].comment){
                objectArray = [...objectArray, ...postsDetails[key].comment]
            }
        })
        const postContent = postsSorted(objectArray,true)

        res.send(postContent)
    })
})

app.post('/api/sendPostComment', (req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        const sendComment = await db.collection('posts').update(
            {_id: MongoID(id)},
            {
                $push:{"mainContent.comment": comment}
            },
            {upsert: true}
        )

        client.close()
    })
})

app.get('/api/getLesson',(req,res) => {
    const page = req.query.page
    const skip = page*5
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(res.stack)
        }
        
        const db = client.db('data-jour')
        const lessonQuery = await db.collection('lessons').find().sort({_id:-1}).skip(skip).limit(5).toArray()
        client.close()

        let lessonsUnsorted = []
        lessonQuery.map((el) => {
            let lesson = el.lesson
            let id = el._id
            lesson = {
                id: id,
                ...lesson
            }
            lessonsUnsorted.push(lesson)
        })
        const lessonsQuerySorted = postsSorted(lessonsUnsorted)

        res.send(lessonsQuerySorted)
    })
})

app.get('/api/getLessonDetails',(req,res) => {
    const id = req.query.id

    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        const lessonDetails = await db.collection('lessons').findOne({_id:MongoID(id)})
        client.close()
        let lessonDetailsToArray = []
        Object.keys(lessonDetails).forEach((key) => {
            lessonDetailsToArray.push(lessonDetails[key])
            if(lessonDetails[key].comment){
                lessonDetailsToArray = [...lessonDetailsToArray, ...lessonDetails[key].comment]
            }
        })

        const lessonRecieved = postsSorted(lessonDetailsToArray,true)

        res.send(lessonRecieved)
    })
})

app.post('/api/sendLessonComment', (req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    MongoClient.connect(mongoUrl, (err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        const sendLessonComment = db.collection('lessons').update(
            {_id:MongoID(id)},
            {
                $push: {'lesson.comment':comment}
            },
            {upsert: true}
        )
        client.close()
    })
})

app.get('/api/updateLikeAndStar', (req,res) => {
    const liked = req.query.liked
    const stared = req.query.stared
    const id = req.query.id
    MongoClient.connect(mongoUrl, (err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        if(liked !== 'noChange'){
            const updateLikeAndStar = db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'lesson.liked': liked}
                }
            )
        }else if(stared !== 'noChange'){
            const updateLikeAndStar = db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'lesson.stared': stared}
                }
            )
        }
        client.close()
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

const postsSorted = (postsUnsorted, forDetailPage) => {
    let postsSorted = []
    postsUnsorted.map((el,index) => {
        let time = null
        if(el.user){
            if(forDetailPage){
                const timestamp = parseInt(el.time)
                time = new Date(timestamp).toLocaleDateString() + " " + new Date(timestamp).toLocaleTimeString()
            }else{
                const timeUpload = el.time;
                const timeNow = Date.now();
                const timePassed = ((timeNow - timeUpload)/1000).toFixed(0);
                let timePassedString = '';
                if (timePassed < 60){
                    timePassedString = timePassed + '秒'
                }else if(timePassed < 60*60){
                    timePassedString = (timePassed/60).toFixed(0) + '分'
                }else if(timePassed < 60*60*24){
                    timePassedString = (timePassed/(60*60)).toFixed(0) + '小时'
                }else if(timePassed < 60*60*24*30){
                    timePassedString = (timePassed/(60*60*24)).toFixed(0) + '天'
                }else if(timePassed < 60*60*24*365){
                    timePassedString = (timePassed/(60*60*24*30)).toFixed(0) + '月'
                }else{
                    timePassedString = (timePassed/(60*60*24*365)).toFixed(0) + '年'
                }
                time = timePassedString
            }

            let postElement = {}

            for(let key in el){
                let elementOfEl = {}
                elementOfEl[key] = el[key]
                postElement = {...postElement, ...elementOfEl}
            }

            postElement = {
                ...postElement,
                key: el.title+el.time+el.user,
                id: el.id,
                time: time,
            }

            postsSorted.push(postElement)
        }
    })
    return postsSorted
}

//userLogin

app.post('/api/login',(req,res) => {
    const data = req.body.userLoginData
    console.log(data)
    const userData = {
        name: 'eve',
        email: 'text@text.com',
        password: 'dhidhoidhq',
        profilePic: 'second',
        stared: [],
        liked: [],
        post: [],
        category: 'basic',
    }
    const user = new mongooseModel(userData)

    user.save().catch(err => {
        console.log(err.stack)
    })

    res.send(userData)
})
