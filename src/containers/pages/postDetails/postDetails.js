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
        unLoginAlert: false,
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
            userEmail: this.props.userData.email,
            time: time,
            content: comment.content,
        }
        this.setState({
            commentSubmitted: true
        })
        await axios.post('/api/sendPostComment',{
            id: id,
            comment: commentWillSent,
            userEmail: this.props.userData.email
        })
    }

    ifDelete = () => {
        this.setState({
            makeSureDelete: true
        })
    }

    deletePost = async() => {
        console.log('wow')
        const id = this.state.id
        const email = this.props.userData.email

        await axios.post('/api/deletePost', {
            id: id,
            email: email
        }).then((response) => {
            console.log(response.data)
            window.history.back()
        })
    }

    render(){
        const comment = this.state.comment
        const commentHtml = marked(comment.content)
        let showDelete = null

        return(
            <div className={classes.postDetails}>
                {this.state.post.map((el, index) => {
                    showDelete = false
                    const content = marked(el.content)
                    if((el.title)&&
                    (el.user===this.props.userData.name)){
                    showDelete = true
                }
                    return <SingleContent
                        key={index}
                        userProfile={el.userProfile}
                        title={el.title}
                        userName={el.user}
                        updateTime={el.time}
                        content={content}
                        onClick={this.deletePost}
                        style={showDelete?null:{display:'none'}} />
                })}
                {this.props.login?
                    <div className={classes.commentBox}>
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