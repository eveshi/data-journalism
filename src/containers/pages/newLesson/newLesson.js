import React, { Component } from 'react';
import axios from '../../../axios_data';
import marked from 'marked';
import InputLesson from '../../../components/inputPost/inputPost';
import Button from '../../../components/button/button';
import SaveSuccessfully from '../../../components/saveSuccessfully/saveSuccessfully'
import classes from './newLesson.css';

class NewLesson extends Component{
    state = {
        title:{
            inputType:'text',
            placeholder: '输入标题……',
            value: '',
            name: 'title',
        },
        titlePic:{
            inputType:'text',
            placeholder: '输入题图地址……',
            value: '',
            hide: true,
            name:'titlePic',
        },
        titleVideo:{
            inputType:'text',
            placeholder: '输入视频地址(仅限Youtube）……',
            value: '',
            hide: true,
            name:'titleVideo',
        },
        content:{
            inputType:'textarea',
            placeholder: '输入内容……',
            value: '',
            name:'content',
        },
        comment:{
            value: [],
        },
        time:{
            value: null,
        },
        user:{
            value: 'admin',
        },
        userProfile: {
            value: 'second',
        },
        liked: {
            value: 0,
        },
        stared:{
            value: 0,
        },
        submitted: false,
        wordsCount: null,
    }

    submitHandler = () => {
        let lesson = {}
        for(let key in this.state){
            let lessonElement = {}
            lessonElement[key] = this.state[key].value
            lesson = {...lesson, ...lessonElement}
        }
        console.log(lesson)
        const timeNow = Date.now()
        lesson.time = timeNow
        if(lesson.titlePic === ''){
            lesson.titlePic = 'http://blog.finjs.io/wp-content/uploads/2017/02/474570722.jpg'
        }else{
            console.log('else'+this.state.titlePic.value)
        }
        this.setState({
            submitted: true
        })
        const request = this.uploadLesson(lesson)
    }

    uploadLesson = async(lesson) => await axios.post('/api/sendLesson',{
        lesson: lesson
    })

    changeHandler = (event, name) => {
        let inputValue = event.target.value
        switch(name){
            case 'title':
                this.setState((prevState) =>({
                    title:{
                        ...prevState.title,
                        value: inputValue
                    }
                }));
                break;
            case 'content':
                const wordsCount = inputValue.length
                this.setState((prevState) =>({
                    content:{
                        ...prevState.content,
                        value: inputValue
                    },
                    wordsCount: wordsCount
                }));
                break;
            case 'titlePic':
                this.setState((prevState) =>({
                    titlePic:{
                        ...prevState.titlePic,
                        value: inputValue
                    }
                }));
                break;
            case 'titleVideo':
                this.setState((prevState) =>({
                    titleVideo:{
                        ...prevState.titleVideo,
                        value: inputValue
                    }
                }));
                break;
            default:
                break;
        }
    }

    addMedia = (name) => {
        switch(name){
            case 'titlePic':
                if(this.state.titlePic.hide === true){
                    this.setState((prevState) => ({
                        titlePic:{
                            ...prevState.titlePic, 
                            hide: false
                        },
                    }))
                }else if(this.state.titlePic.hide === false){
                    this.setState((prevState) => ({
                        titlePic:{
                            ...prevState.titlePic, 
                            hide: true,
                            value: '',
                        },
                    }))
                };
                break;
            case 'titleVideo':
                if(this.state.titleVideo.hide === true){
                    this.setState((prevState) => ({
                        titleVideo:{
                            ...prevState.titleVideo, 
                            hide: ! prevState.titleVideo.hide,
                        },
                    }))
                }else if(this.state.titleVideo.hide === false){
                    this.setState((prevState) => ({
                        titleVideo:{
                            ...prevState.titleVideo, 
                            hide: ! prevState.titleVideo.hide,
                            value: '',
                        },
                    }))
                };
                break;
            default:
                break;
        }
    }

    render(){
        let content = Object.assign({},this.state.content)
        let contentDisplay = marked(content.value)

        return(
            <div className={classes.newLesson}>
                <InputLesson className={classes.title}
                    inputType={this.state.title.inputType}
                    placeholder={this.state.title.placeholder}
                    value={this.state.title.value}
                    change={(event) => this.changeHandler(event,this.state.title.name)} />
                <div className={classes.addMedia}>
                    <InputLesson
                        inputType={this.state.titlePic.inputType}
                        placeholder={this.state.titlePic.placeholder}
                        value={this.state.titlePic.value}
                        hide={this.state.titlePic.hide}
                        change={(event) => this.changeHandler(event,this.state.titlePic.name)}
                        maxlength='100' />
                    <Button 
                        onClick={() => this.addMedia(this.state.titlePic.name)} 
                        name={this.state.titlePic.hide?"添加题图":"删除题图"} />
                </div>
                <div className={classes.addMedia}>
                    <InputLesson
                        inputType={this.state.titleVideo.inputType}
                        placeholder={this.state.titleVideo.placeholder}
                        value={this.state.titleVideo.value}
                        hide={this.state.titleVideo.hide}
                        change={(event) => this.changeHandler(event,this.state.titleVideo.name)}
                        maxlength='100' />
                    <Button 
                        onClick={() => this.addMedia(this.state.titleVideo.name)} 
                        name={this.state.titleVideo.hide?"添加视频":"删除视频"} />
                </div>
                <InputLesson 
                    inputType={this.state.content.inputType}
                    placeholder={this.state.content.placeholder}
                    value={this.state.content.value}
                    change={(event) => this.changeHandler(event,this.state.content.name)}
                    inputContentDisplay={contentDisplay}
                    wordsCount={this.state.wordsCount} />
                <Button onClick={this.submitHandler} name='提交'/>
                {this.state.submitted === true?
                    <SaveSuccessfully goBackTo='/lessons' /> : null}
            </div>
        )
    }
}

export default NewLesson;
