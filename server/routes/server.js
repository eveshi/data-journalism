const express = require('express');
const cors = require('cors');
let bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const MongoID = require('mongodb').ObjectId;
const mongooseModel = require('../models/user')
const bcrypt = require('react-native-bcrypt')

const assert = require('assert');
const co = require('co');

const app = express();
console.log('PORT:', process.env.PORT);
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/build'));
const mongoUrl = 'mongodb://localhost:27017/data-jour';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sendPost', async(req, res) => {
    const post = req.body.mainContent
    const userEmail = req.body.userEmail
    await MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addPost = await db.collection('posts').insertOne(post);
        assert.equal(1, addPost.insertedCount);
        const changeUserData = await db.collection('user').update(
            {email: userEmail},
            {
                $push: {'post': addPost.ops[0]._id}
            },
            {upsert: true}
        )
        const userData = await db.collection('user').findOne({email: userEmail})
        client.close()

        res.send(userData)
    })
});

app.post('/api/sendLesson',async(req,res) => {
    const lesson = req.body.lesson
    await MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const addLesson = await db.collection('lessons').insertOne(lesson);
        assert.equal(1,addLesson.insertedCount)
        client.close()
    })
});

app.get('/api/getPost', async(req, res) => {
    const page = req.query.page
    const itemInEveryPage = req.query.itemInEveryPage
    const limit = parseInt(itemInEveryPage)
    const skip = (page-1)*itemInEveryPage
    await MongoClient.connect(mongoUrl, async(err, client) => {
        if(err){
            console.log(err.stack)
        }
        const db = client.db('data-jour');
        const postQuery = await db.collection('posts').find().sort({_id:-1}).skip(skip).limit(limit).toArray()
        const totalNumber = await db.collection('posts').count()

        client.close()

        const response = await getUserData(postQuery)

        const postSentBack = postsSorted(response)
        const dataSentBack = {
            postSentBack,
            totalNumber: totalNumber
        }

        res.send((dataSentBack));
    })
})

app.get('/api/postDetails',async(req, res) => {
    const id = req.query.id
    await MongoClient.connect(mongoUrl, async(err,client) => {
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

        const response = await getUserData(objectArray)

        const postContent = postsSorted(response,true)

        res.send(postContent)
    })
})

app.post('/api/sendPostComment', async(req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    const userEmail = req.body.userEmail
    await MongoClient.connect(mongoUrl, async(err, client) => {
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

app.post('/api/deletePost', async(req,res) => {
    const id = req.body.id
    const email = req.body.email

    await MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')

        const deletePost = await db.collection('posts').deleteOne({_id:MongoID(id)})
        const deletePostInUser = await db.collection('user').update(
            {email:email},
            {
                $pull:{post:MongoID(id)}
            }
        )

        client.close()

        res.send('success')
    })
})

app.get('/api/getLesson',async(req,res) => {
    const page = req.query.page
    const skip = page*5
    await MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(res.stack)
        }
        
        const db = client.db('data-jour')
        const lessonQuery = await db.collection('lessons').find().sort({_id:-1}).skip(skip).limit(5).toArray()
        client.close()

        const response = await getUserData(lessonQuery)

        const lessonsQuerySorted = postsSorted(response)

        res.send(lessonsQuerySorted)
    })
})

app.get('/api/getLessonDetails',async(req,res) => {
    const id = req.query.id

    await MongoClient.connect(mongoUrl, async(err,client) => {
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

        const response = await getUserData(lessonDetailsToArray)
        const lessonRecieved= postsSorted(response,true)

        res.send(lessonRecieved)
    })
})

app.post('/api/sendLessonComment', async(req,res) => {
    const id = req.body.id
    const comment = req.body.comment
    await MongoClient.connect(mongoUrl, (err,client) => {
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

app.get('/api/updateLikeAndStar', async(req,res) => {
    const liked = req.query.liked
    const stared = req.query.stared
    const id = req.query.id
    const userEmail = req.query.userEmail
    const increaseFlag = req.query.increaseFlag
    await MongoClient.connect(mongoUrl, async(err,client) => {
        if(err){
            console.log(err.stack)
        }

        const db = client.db('data-jour')
        if(liked !== 'noChange'){
            const updateLikeAndStar = await db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'liked': liked}
                }
            )
            if(userEmail !== 'do not login'){
                if(increaseFlag === 'true'){
                    let changeUserLike = await db.collection('user').update(
                        {email: userEmail},
                        {
                            $push:{'liked': id}
                        },
                        {upsert: true}
                    )
                }else if(increaseFlag === 'false'){
                    let changeUserLike = await db.collection('user').update(
                        {email: userEmail},
                        {
                            $pull:{'liked': id}
                        },
                    )
                }
            }
        }else if(stared !== 'noChange'){
            const updateLikeAndStar = await db.collection('lessons').update(
                {_id: MongoID(id)},
                {
                    $set:{'stared': stared}
                }
            )
            if(userEmail !== 'do not login'){
                if(increaseFlag === 'true'){
                    let changeUserStar = await db.collection('user').update(
                        {email: userEmail},
                        {
                            $push:{'stared': id}
                        },
                        {upsert: true}
                    )
                }else if(increaseFlag === 'false'){
                    let changeUserStar = await db.collection('user').update(
                        {email: userEmail},
                        {
                            $pull:{'stared': id}
                        },
                    )
                }
            }
        }
        
        const userData = await db.collection('user').findOne({
            email: userEmail
        })

        client.close()

        res.send(userData)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

const getUserData = async(request) => {
    let newPostQuery = []
    for(const item of request){
        await mongooseModel.findOne({email:item.userEmail}, (err, user) => {
            const newPost = {
                ...item, 
                user: user.name,
                userProfile: user.profilePic }
            newPostQuery.push(newPost)
        })
    }
    return newPostQuery
}

const postsSorted = (postsUnsorted, ifForDetailPage) => {
    console.log(postsUnsorted)
    let postsSorted = []
    postsUnsorted.map((el,index) => {
        let time = null
        if(el.user || el.userEmail){
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
            console.log(postElement)
            postsSorted.push(postElement)
            console.log('ufu')
            console.log(postsSorted)
        }
    })
    console.log(postsSorted)
    return postsSorted
}

//userSignin

app.post('/api/signin',async(req,res) => {
    const userData = req.body.newUser
    const email=userData.email
    await mongooseModel.findOne({email:email}, (err, user)=>{
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

app.post('/api/login', async(req,res) => {
    const userData = req.body.oldUser
    const email = userData.email
    const password = userData.password
    await mongooseModel.findOne({email:email}, (err, user)=>{
        if(err){
            console.log(err.stack)
        }
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                res.send(user)
            }else{
                res.send('wrong password')
            }
        }else{
            res.send('invalid email')
        }
    })
})

app.post('/api/getUserLikeStaredPost', async(req,res) => {
    const userLiked = req.body.userLiked
    const userStared = req.body.userStared
    const userPost = req.body.userPost
    let newUserLikedArray = null
    let newUserStaredArray = null
    let newUserPostArray = null
    if(userLiked !== '' && userLiked !== undefined){
        newUserLikedArray = []
        userLiked.map((item) => {
            console.log(item)
            newUserLikedArray.push(MongoID(item))
        })
    }
    if(userStared !== '' && userStared !== undefined){
        newUserStaredArray = []
        userStared.map((item) => {
            newUserStaredArray.push(MongoID(item))
        })
    }
    if(userPost !== '' && userPost !== undefined){
        console.log(userPost)
        newUserPostArray = []
        userPost.map((item) => {
            newUserPostArray.push(MongoID(item))
        })
    }
    await MongoClient.connect(mongoUrl, async(err,client) =>{
        if(err){
            console.log(err.stack)
        }

        let userLikedDetails = []
        let userStaredDetails = []
        let userPostDetails = []
        const db = client.db('data-jour')
        if(newUserLikedArray !== null){
            userLikedDetails = await db.collection('lessons').find({
                _id: {
                    $in: newUserLikedArray
                }
            }).sort({_id:-1}).toArray()
        }
        if(newUserStaredArray !== null){
            userStaredDetails = await db.collection('lessons').find({
                _id:{
                    $in: newUserStaredArray
                }
            }).sort({_id:-1}).toArray()
        }
        if(newUserPostArray !== null){
            userPostDetails = await db.collection('posts').find({
                _id:{
                    $in: newUserPostArray
                }
            }).sort({_id:-1}).toArray()
        }
        client.close()

        const newLiked = postsSorted(userLikedDetails)
        const newStared = postsSorted(userStaredDetails)
        const newPost = postsSorted(userPostDetails)

        const sendBackObject = {
            userLikedDetails: newLiked,
            userStaredDetails: newStared,
            userPostDetails: newPost
        }

        res.send(sendBackObject)
        
    })
})

app.post('/api/changeUserData', async(req,res) => {
    const profilePic = req.body.profilePic
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    if(profilePic !== undefined && profilePic !== ''){
        await mongooseModel.findOneAndUpdate({email:email},{profilePic: profilePic},{new:true}, (err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        }) 
    }
    if(name !== undefined && name !== ''){
        await mongooseModel.findOneAndUpdate({email:email},{name:name},{new:true},(err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        })
    }
    if(password !== undefined && password !== ''){
        await mongooseModel.findOneAndUpdate({email:email},{password:password},{new:true},(err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        })
    }
})