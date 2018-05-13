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
    const post = req.body.mainContent
    const userEmail = req.body.userEmail
    console.log(userEmail)
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addPost = await db.collection('posts').insertOne(post);
        assert.equal(1, addPost.insertedCount);
        console.log(addPost.ops[0]._id)
        const changeUserData = db.collection('user').update(
            {email: userEmail},
            {
                $push: {'post': addPost.ops[0]._id}
            },
            {upsert: true}
        )
        client.close()
    })
});

app.post('/api/sendLesson',(req,res) => {
    const lesson = req.body.lesson
    MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addLesson = await db.collection('lessons').insertOne(lesson);
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

        const postSentBack = postsSorted(postQuery)
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
        Object.keys(postsDetails).map((key) => {
            let item = {[key]: postsDetails[key]}
            if(key !== 'comment'){
                objectArray[0] = {...objectArray[0], ...item}
            }else{
                objectArray = [...objectArray, ...postsDetails.comment]
            }
        })
        const postContent = postsSorted(objectArray,true)

        res.send(postContent)
    })
})

app.post('/api/sendPostComment', (req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    const userEmail = req.body.userEmail
    MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        const sendComment = await db.collection('posts').update(
            {_id: MongoID(id)},
            {
                $push:{"comment": comment}
            },
            {upsert: true}
        )

        const changeUserData = await db.collection('user').update(
            {email: userEmail},
            {
                $push:{"comment": id}
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

        const lessonsQuerySorted = postsSorted(lessonQuery)

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
        Object.keys(lessonDetails).map((key) => {
            let item = {[key]: lessonDetails[key]}
            if(key !== 'comment'){
                lessonDetailsToArray[0] = {...lessonDetailsToArray[0], ...item}
            }else{
                lessonDetailsToArray= [...lessonDetailsToArray, ...lessonDetails.comment]
            }
        })
        const lessonRecieved= postsSorted(lessonDetailsToArray,true)

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
                $push: {'comment':comment}
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
    const userEmail = req.query.userEmail
    const increaseFlag = req.query.increaseFlag
    MongoClient.connect(mongoUrl, (err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        if(liked !== 'noChange'){
            const updateLikeAndStar = db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'liked': liked}
                }
            )
            if(userEmail !== 'do not login'){
                if(increaseFlag === 'true'){
                    let changeUserLike = db.collection('user').update(
                        {email: userEmail},
                        {
                            $push:{'liked': id}
                        },
                        {upsert: true}
                    )
                }else if(increaseFlag === 'false'){
                    let changeUserLike = db.collection('user').update(
                        {email: userEmail},
                        {
                            $pull:{'liked': id}
                        },
                        {upsert: true}
                    )
                }
            }
        }else if(stared !== 'noChange'){
            const updateLikeAndStar = db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'stared': stared}
                }
            )
            if(userEmail !== 'do not login'){
                if(increaseFlag === 'true'){
                    let changeUserStar = db.collection('user').update(
                        {email: userEmail},
                        {
                            $push:{'stared': id}
                        },
                        {upsert: true}
                    )
                }else if(increaseFlag === 'false'){
                    let changeUserStar = db.collection('user').update(
                        {email: userEmail},
                        {
                            $pull:{'stared': id}
                        },
                        {upsert: true}
                    )
                }
            }
        }
        client.close()
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

const postsSorted = (postsUnsorted, ifForDetailPage) => {
    let postsSorted = []
    postsUnsorted.map((el,index) => {
        let time = null
        if(el.user){
            if(ifForDetailPage){
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
                id: el._id,
                time: time,
            }

            postsSorted.push(postElement)
        }
    })
    return postsSorted
}

//userSignin

app.post('/api/signin',(req,res) => {
    const userData = req.body.newUser
    const email=userData.email
    mongooseModel.findOne({email:email}, (err, user)=>{
        if(err){
            console.log(err.stack)
        }
        if(user){
            res.send('The email has been registered')
        }else{
            const newUser = new mongooseModel(userData)
            newUser.save(
                () => {
                    res.send('Successfully Registered')
                }
            )
        }
    })
})

app.post('/api/login', (req,res) => {
    const userData = req.body.oldUser
    const email = userData.email
    const password = userData.password
    mongooseModel.findOne({email:email}, (err, user)=>{
        if(err){
            console.log(err.stack)
        }
        if(user){
            if(user.password === password){
                res.send(user)
            }else{
                res.send('wrong password')
            }
        }else{
            res.send('invalid email')
        }
    })
})

app.post('/api/changeUserData', (req,res) => {
    const profilePic = req.body.profilePic
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    console.log(profilePic)
    console.log(name)
    console.log(password)
    if(profilePic !== null && ''){
        mongooseModel.findOneAndUpdate({email:email},{profilePic: profilePic},{new:true}, (err) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
        })
        res.send('success')
    }
    if(name !== null && ''){
        mongooseModel.findOneAndUpdate({email:email},{name:name},{new:true},(err) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
        })
        res.send('success')
    }
    if(password !== null && ''){
        mongooseModel.findOneAndUpdate({email:email},{password:password},{new:true},(err) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send('success')
        })
    }
})