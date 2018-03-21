import React from 'react';
import { Route } from 'react-router-dom';
import Layouts from '../../hoc/Layouts/layouts';
import NewPost from '../pages/newPost/newPost';
import Community from '../pages/community/community';
import postDetails from '../pages/postDetails/postDetails';


const page = () => {
    return (
        <Layouts>
            <Route path="/community/newpost" exact component={NewPost} />
            <Route path="/community" exact component={Community} />
            <Route path="/community/post"  component={postDetails} />
        </Layouts>
    )
}

export default page;