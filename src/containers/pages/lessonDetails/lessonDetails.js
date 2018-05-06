import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios_data';
import SingleContent from '../../../components/singleContent/singleContent';
import InputComment from '../../../components/inputPost/inputPost';
import Button from '../../../components/button/button';
import AlertBox from '../../../components/alertBox/alertBox';
import YoutubePlayer from '../../../components/youtubePlayer/youtubePlayer';
import SaveSuccessfully from '../../../components/saveSuccessfully/saveSuccessfully';
import Like from '../../../components/like/like';
import Star from '../../../components/star/star';
import marked from 'marked';
import classes from './lessonDetails.css';

class LessonDetails extends Component {
    state = {
        content: [],
        comment: {
            inputType: 'textarea',
            placeholder: '想要输入什么评论呢……',
            content: '',
        },
        videoUrl: null,
        picUrl: null,
        commentSubmitted: false,
        wordsCount: null,
        currentLikedState: false,
        currentStaredState: false,
        unLoginAlert: false
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getDetails(id).then((content)=>{
            console.log(content)
            let videoUrl = null
            if(content[0].titleVideo !== ''){
                videoUrl = content[0].titleVideo
            }
            this.setState({
                content: content,
                id: id,
                videoUrl: videoUrl,
                picUrl: content[0].titlePic
            })
        })
    }

    getDetails = async(id) => {
        const response = await axios.get('/api/getLessonDetails',{
            params:{
                id: id
            }
        })
        const content = response.data
        return content
    }

    commentChangeHandler = (event) => {
        const content = event.target.value
        const wordsCount = content.length
        this.setState({
            comment:{
                ...this.state.comment,
                content: content
            },
            wordsCount: wordsCount
        })
    }

    unLoginAlertChangeHandler = () => {
        this.setState({
            unLoginAlert: ! this.state.unLoginAlert
        })
    }

    submitHandler = async() => {
        const time = Date.now()
        const comment = {
            user: this.props.userData.name,
            userProfile: this.props.userData.profilePic,
            content: this.state.comment.content,
            time: time
        }
        this.setState({
            commentSubmitted: true
        })
        const request = await this.sendComment(comment, this.state.id, this.props.userData.email)
    }

    sendComment = async(comment, id, email) => {
        const request = await axios.post('/api/sendLessonComment', {
            comment:comment,
            id: id,
            email: email
        })
    }

    like = async() => {
        let numbersOfLiked = this.state.content[0].liked
        let content = this.state.content
        if(this.state.currentLikedState === false){
            numbersOfLiked = parseInt(numbersOfLiked,10) + 1
            content[0].liked = numbersOfLiked
            this.setState({
                content: content,
                currentLikedState: ! this.state.currentLikedState
            })
            console.log(numbersOfLiked)
        }else if(this.state.currentLikedState === true){
            numbersOfLiked = parseInt(numbersOfLiked,10) - 1
            content[0].liked = numbersOfLiked
            this.setState({
                content: content,
                currentLikedState: ! this.state.currentLikedState
            })
            console.log(numbersOfLiked)
        }
        const request = await this.updateLikeAndStar(numbersOfLiked, 'noChange')
    }

    star = async() => {
        let numbersOfStared = this.state.content[0].stared
        let content = this.state.content
        if(this.state.currentStaredState === false){
            numbersOfStared = parseInt(numbersOfStared, 10) + 1
            content[0].stared = numbersOfStared
            this.setState({
                content: content,
                currentStaredState: !this.state.currentStaredState
            })
        }else if(this.state.currentStaredState === true){
            numbersOfStared = parseInt(numbersOfStared, 10) - 1
            content[0].stared = numbersOfStared
            this.setState({
                content: content,
                currentStaredState: !this.state.currentStaredState
            })
        }
        const request = await this.updateLikeAndStar('noChange', numbersOfStared)
    }

    updateLikeAndStar = async(numbersOfLiked, numbersOfStared) => {
        console.log('send now')
        const request = await axios.get('/api/updateLikeAndStar', {
            params:{
                liked: numbersOfLiked,
                stared: numbersOfStared,
                id: this.state.id,}
        })
        console.log(request)
    }

    render(){
        const comment = this.state.comment
        const commentDisplay = marked(comment.content)

        let likedNumber = 0
        let staredNumber = 0
        if(this.state.content[0]){
            likedNumber = this.state.content[0].liked
            staredNumber = this.state.content[0].stared
        }


        return(
            <div className={classes.lessonDetails}>
            <Like 
                onClick={this.like}
                liked={this.state.currentLikedState}
                numbersOfLike={likedNumber} />
            <Star
                onClick={this.star}
                stared={this.state.currentStaredState}
                numbersOfStar={staredNumber} />
                {this.state.videoUrl?
                    <YoutubePlayer videoUrl={this.state.videoUrl}/>:
                    this.state.picUrl?
                        <img className={classes.titlePic}
                            src={this.state.picUrl} 
                            alt='title'/>:null}
                {this.state.content.map((content) => {
                    return(
                        <SingleContent
                            key={content.key}
                            userProfile={content.userProfile}
                            userName={content.user}
                            title={content.title}
                            updateTime={content.time}
                            content={content.content} />
                    )
                })}
                {this.props.login?
                    <div>
                        <InputComment 
                            inputType={this.state.comment.inputType}
                            placeholder={this.state.comment.placeholder}
                            value={this.state.comment.value}
                            change={(event) => this.commentChangeHandler(event)}
                            inputContentDisplay={commentDisplay}
                            maxlength='500'
                            wordsCount={this.state.wordsCount} />
                        <Button onClick={this.submitHandler} name='提交' />
                    </div>:
                    <p className={classes.addComment}
                        onClick={this.unLoginAlertChangeHandler}>添加评论</p>}
                {this.state.commentSubmitted === true?
                    <SaveSuccessfully goBackTo='/lessons' /> : null}
                {this.state.unLoginAlert === true?
                    <AlertBox alertContent='请登录后再进行评论' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.unLoginAlertChangeHandler} />:null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(LessonDetails);