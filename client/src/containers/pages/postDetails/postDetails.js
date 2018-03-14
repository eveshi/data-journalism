import React,{ Component } from 'react';
import marked from 'marked';
import axios from '../../../axios_data';
import Button from "../../../components/button/button"
import SingleContent from './singleContent/singleContent';
import InputPost from '../../../components/inputPost/inputPost';

class PostDetails extends Component {
    state = {
        post: [],
        comment: {
            inputType: "textarea",
            placeholder: "评论",
            value: "",
        }
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getPost(id).then((post) => {
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

    conmmentValue = (event) => {
        const comment = this.state.comment
        comment.value = event.target.value
        this.setState({
            comment: comment
        })
    }

    submitHandler = () => {
        const post = this.state.post[0]
        const comment = this.state.comment
        const id = post.key
        const time = new Date()
        const key = this.state.post.length

        const commentWillSent = {
            key: key,
            userName: post.userName,
            userProfile: post.userProfile,
            time: time,
            value: comment.value,
        }
        axios.post('api/sendComment',{
            id: id,
            comment: commentWillSent,
        })
    }

    render(){
        const comment = this.state.comment
        const commentHtml = marked(comment.value)

        return(
            <div>
                {this.state.post.map((el, index) => {
                    const content = marked(el.content)

                    return <SingleContent
                        key={index}
                        userProfile={el.userProfile}
                        title={el.title}
                        userName={el.userName}
                        updateTime={el.time}
                        content={content} />
                })}
                <InputPost
                    inputType={comment.inputType}
                    placeholder={comment.placeholder}
                    value={comment.value}
                    change={this.conmmentValue}
                    inputContentDisplay={commentHtml} />
                <Button onClick={this.submitHandler} name="提交" />
            </div>
        )
    }
};

export default PostDetails;