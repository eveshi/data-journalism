import React from 'react';
import { Route } from 'react-router-dom';
import Layouts from '../../hoc/Layouts/layouts';
import NewPost from '../pages/community/newPost/newPost';
import AllPost from '../pages/community/allPosts/allPosts';
import postDetails from '../pages/community/allPosts/postDetails/postDetails';


const page = () => {
    return (
        <Layouts>
            <Route path="/community/newpost" exact component={NewPost} />
            <Route path="/community" exact component={AllPost} />
            <Route path="/community/post"  component={postDetails} />
        </Layouts>
    )
}

export default page;