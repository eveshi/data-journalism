import React,{ Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import axios from '../../../axios_data';
import Button from "../../../components/button/button"
import SingleContent from '../../../components/singleContent/singleContent';
import AlertBox from '../../../components/alertBox/alertBox';
import InputPost from '../../../components/inputPost/inputPost';
import SaveSuccessfully from '../../../components/saveSuccessfully/saveSuccessfully'
import classes from './postDetails.css'

class PostDetails extends Component {
    state = {
        post: [],
        comment: {
            inputType: "textarea",
            placeholder: "评论",
            content: "",
        },
        id: null,
        commentSubmitted: false,
        wordsCount: null,
        unLoginAlert: false
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getPost(id).then((post) => {
            this.setState({
                post: post,
                id: id
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

    unLoginAlertChangeHandler = () => {
        this.setState({
            unLoginAlert: ! this.state.unLoginAlert
        })
    }

    conmmentValue = (event) => {
        const comment = this.state.comment
        comment.content = event.target.value
        const wordsCount = comment.content.length
        this.setState({
            comment: comment,
            wordsCount: wordsCount
        })
    }

    submitHandler = async() => {
        const comment = this.state.comment
        const id = this.state.id
        const time = Date.now()

        const commentWillSent = {
            user: this.props.userData.name,
            userProfile: this.props.userData.profilePic,
            time: time,
            content: comment.content,
        }
        this.setState({
            commentSubmitted: true
        })
        await axios.post('api/sendPostComment',{
            id: id,
            comment: commentWillSent,
            email: this.props.userData.email
        })
    }

    render(){
        const comment = this.state.comment
        const commentHtml = marked(comment.content)

        return(
            <div className={classes.postDetails}>
                {this.state.post.map((el, index) => {
                    const content = marked(el.content)

                    return <SingleContent
                        key={index}
                        userProfile={el.userProfile}
                        title={el.title}
                        userName={el.user}
                        updateTime={el.time}
                        content={content} />
                })}
                {this.props.login?
                    <div>
                        <InputPost
                            inputType={comment.inputType}
                            placeholder={comment.placeholder}
                            value={comment.content}
                            change={this.conmmentValue}
                            inputContentDisplay={commentHtml}
                            wordsCount={this.state.wordsCount}
                            maxlength='500' />
                        <Button onClick={this.submitHandler} name="提交" />
                    </div>:
                    <p className={classes.addComment}
                        onClick={this.unLoginAlertChangeHandler}>添加评论</p>}
                {this.state.commentSubmitted === true?
                    <SaveSuccessfully goBackTo='/community' /> : null}
                {this.state.unLoginAlert === true?
                    <AlertBox alertContent='请登录后再进行评论' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.unLoginAlertChangeHandler} />:null}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(PostDetails);