import React, { Component } from 'react';
import axios from '../../../../axios_data';
import classes from './allPosts.css';

class allPost extends Component {
    state = {
        posts: []
    }

    componentWillMount(){
        const posts = this.state.posts
        axios.get('/api/getPost',(req,res) => {

        })
    }

    render(){
        return(
            <div>
                {this.state.posts.map((el) => {
                    return (
                        <div>
                            <singlePost /> 
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default allPost;