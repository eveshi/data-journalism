import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layouts from '../../hoc/layouts/layouts';
import NewPost from '../pages/newPost/newPost';
import Community from '../pages/community/community';
import PostDetails from '../pages/postDetails/postDetails';
import Lesson from '../pages/lesson/lesson';
import NewLesson from './newLesson/newLesson';
import LessonDetails from './lessonDetails/lessonDetails';
import Signin from './loginOrSignin/loginOrSignin';
import Home from './home/home'

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
        </Layouts>
    )
}

export default page;