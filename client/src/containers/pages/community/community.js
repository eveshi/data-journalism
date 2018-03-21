import React, { Component } from 'react';
import axios from '../../../axios_data';
import SinglePost from './singlePost/singlePost';
import Aux from '../../../hoc/Aux/aux';
import classes from './community.css';

class Community extends Component {
    state = {
        posts: []
    }

    componentWillMount(){
        this.getPost().then((postsData) => {
            this.setState({
                posts: postsData
            })
        })
    }

    getPost = async() =>{
        const response = await axios.get('/api/getPost',{})
        console.log(response.data)
        return response.data;
    }

    render(){
        return(
            <Aux>
                {this.state.posts.map((el) => {
                    return (
                        <div key={el['key']} className={classes.singlePost}>
                            <SinglePost
                                id={el['id']}
                                userProfile={el['userProfile']}
                                userName={el['userName']}
                                title={el['title']}
                                updateTime={el['time']} /> 
                        </div>
                    )
                })}
            </Aux>
        )
    }
}

export default Community;