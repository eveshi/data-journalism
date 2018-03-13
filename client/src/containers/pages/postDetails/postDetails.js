import React,{ Component } from 'react';
import axios from '../../../axios_data';
import SingleContent from './singleContent/singleContent';
import InputPost from '../../../components/inputPost/inputPost';

class PostDetails extends Component {
    state = {
        post: []
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getPost(id).then((post) =>{
            this.setState({
                post: post
            })
        })
    }   

    getPost = async(id) => {
        const response = await axios.get('/api/postDetails',{
            params:{
                id: id
            }
        })
        return response.data
    }

    render(){
        console.log(this.state.post)
        return(
            <div>
                {this.state.post.map((el, index) => {
                    return <SingleContent
                        key={index}
                        userProfile={el.userProfile}
                        title={el.title}
                        userName={el.userName}
                        updateTime={el.updateTime}
                        content={el.content} />
                })}
                <InputPost />
            </div>
        )
    }
};

export default PostDetails;