import React,{ Component } from 'react';
import axios from '../../../axios_data';
import SingleContent from '../../../components/singleContent/singleContent';
import InputComment from '../../../components/inputPost/inputPost';
import Button from '../../../components/button/button';
import YoutubePlayer from '../../../components/youtubePlayer/youtubePlayer'
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
        id: null,
        videoUrl: null,
        picUrl: null,
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
        this.setState({
            comment:{
                ...this.state.comment,
                content: content
            }
        })
    }

    submitHandler = async() => {
        const time = Date.now()
        const comment = {
            user: 'akb48',
            userProfile: 'first',
            content: this.state.comment.content,
            time: time
        }
        const request = await this.sendComment(comment, this.state.id)
    }

    sendComment = async(comment, id) => {
        const request = await axios.post('/api/sendLessonComment', {
            comment:comment,
            id: id
        })
    }

    render(){
        const comment = this.state.comment
        const commentDisplay = marked(comment.content)
        return(
            <div>
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
                <InputComment 
                    inputType={this.state.comment.inputType}
                    placeholder={this.state.comment.placeholder}
                    value={this.state.comment.value}
                    change={(event) => this.commentChangeHandler(event)}
                    inputContentDisplay={commentDisplay} />
                <Button onClick={this.submitHandler} name='提交' />
            </div>
        )
    }
}

export default LessonDetails;