import React, { Component } from 'react';
import axios from '../../../../axios_data';
import classes from './allPosts.css';

class allPost extends Component {
    state = {
        posts: []
    }

    componentWillMount(){
        const posts = this.state.posts

        // axios.get('/api/getPost',(req,res) => {

        // })
    }

    clickHandler = async() =>{
        const response = await axios.get('/api/getPost',{})
        console.log(response.data)
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
                <button onClick={this.clickHandler}>按一下</button>
            </div>
        )
    }
}

export default allPost;