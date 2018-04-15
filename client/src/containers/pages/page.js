import React from 'react';
import { Route } from 'react-router-dom';
import Layouts from '../../hoc/layouts/layouts';
import NewPost from '../pages/newPost/newPost';
import Community from '../pages/community/community';
import PostDetails from '../pages/postDetails/postDetails';
import Lesson from '../pages/lesson/lesson';
import NewLesson from '../pages/newLesson/newLesson';


const page = () => {
    return (
        <Layouts>
            <Route path="/community/newpost" exact component={NewPost} />
            <Route path="/community" exact component={Community} />
            <Route path="/community/post"  component={PostDetails} />
            <Route path='/lesson' exact component={Lesson} />
            <Route path='/lesson/newlesson' exact component={NewLesson} />
        </Layouts>
    )
}

export default page;