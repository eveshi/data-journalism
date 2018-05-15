import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layouts from '../../hoc/layouts/layouts';
import NewPost from './newPost/newPost';
import Community from './community/community';
import PostDetails from './postDetails/postDetails';
import Lesson from './lesson/lesson';
import NewLesson from './newLesson/newLesson';
import LessonDetails from './lessonDetails/lessonDetails';
import Signin from './loginOrSignin/loginOrSignin';
import UserDetails from './userDetails/userDetails';
import Home from './home/home';
import About from './about/about'

const page = () => {
    return (
        <Layouts>
            <Switch>
                <Route path="/community/newpost" exact component={NewPost} />
                <Route path="/community/post"  component={PostDetails} />
                <Route path='/community' component={Community} />
            </Switch>             
            <Route path="/lessons" exact component={Lesson} />
            <Route path="/lessons/newlesson" exact component={NewLesson} />
            <Route path="/lessons/lesson" component={LessonDetails} />
            <Route path="/home" exact component={Home} />
            <Route path="/" exact component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/user' component={UserDetails} />
            <Route path='/about' component={About} />
        </Layouts>
    )
}

export default page;