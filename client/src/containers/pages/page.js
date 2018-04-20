import React from 'react';
import { Route } from 'react-router-dom';
import Layouts from '../../hoc/layouts/layouts';
import NewPost from '../pages/newPost/newPost';
import Community from '../pages/community/community';
import PostDetails from '../pages/postDetails/postDetails';
import Lesson from '../pages/lesson/lesson';
import NewLesson from './newLesson/newLesson';
import LessonDetails from './lessonDetails/lessonDetails';
import SaveSuccessfully from '../../components/saveSuccessfully/saveSuccessfully';

const page = () => {
    return (
        <Layouts>
            <Route path="/community/newpost" exact component={NewPost} />
            <Route path="/community" exact component={Community} />
            <Route path="/community/post"  component={PostDetails} />
            <Route path="/lessons" exact component={Lesson} />
            <Route path="/lessons/newlesson" exact component={NewLesson} />
            <Route path="/lessons/lesson" component={LessonDetails} />
            <Route path="/save" exact component={SaveSuccessfully} />
        </Layouts>
    )
}

export default page;