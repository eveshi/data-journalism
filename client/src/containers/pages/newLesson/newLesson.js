import React, { Component } from 'react';
import axios from '../../../axios_data';
import marked from 'marked';
import InputLesson from '../../../components/inputPost/inputPost';
import Button from '../../../components/button/button';

class NewLesson extends Component{
    state = {
        lesson: {
            title:{
                inputType:'text',
                placeholder: '输入标题……',
                value: '',
            },
            titlePic:{
                inputType:'text',
                placeholder: '输入题图地址……',
                value: '',
                hide: true,
            },
            changePiture:{
                inputType:'button',
                value: '添加题图',
                onClick: this.pictureChangeHandler,
            },
            titleVideo:{
                inputType:'text',
                placeholder: '输入视频地址(仅限Youtube）……',
                value: '',
                hide: true,
            },
            changeVideo:{
                inputType:'button',
                value:'添加视频',
                onClick: this.videoChangeHandler,
            },
            content:{
                inputType:'textarea',
                placeholder: '输入内容……',
                value: '',
            },
            comment:{
                inputType: null,
                value: [],
            },
            time:{
                inputType: null,
                value: null,
            }
        },
    }

    componentWillMount(props){
        console.log('will monut')
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.state === this.nextState;
    }

    componentWillUpdate(){
        console.log('will update')
    }

    componentDidUpdate(){
        console.log('did update')
    }

    submitHandler = async() => {
        let lesson = this.state.lesson
        const time = Date.now()
        lesson.time.value = time
        let lessonWillBeSent = {}
        for(let key in lesson){
            let lessonElement = {}
            lessonElement[key] = lesson[key].value
            lessonWillBeSent = {...lessonWillBeSent,...lessonElement}
        }
        const request = await this.uploadLesson(lessonWillBeSent)
    }

    uploadLesson = async(lesson) => await axios.post('/api/sendLesson',{
        lesson: lesson
    })

    changeHandler = (event,id) => {
        let lesson = this.state.lesson
        let inputValue = ''
        inputValue = event.target.value
        lesson[id].value = inputValue
        this.setState({
            lesson: lesson
        })
    } 

    pictureChangeHandler = () => {
        console.log('1')
        let lesson = this.state.lesson
        if(lesson.changePiture.value === '添加题图'){
            lesson.changePicture.value = '删除题图'
        }else{
            lesson.changePiture.value = '添加题图'
        }
        lesson.titlePic.hide = !lesson.titlePic.hide
        console.log(lesson)
        this.setState({
            lesson: lesson
        })
    }

    videoChangeHandler = () => {
        let lesson = this.state.lesson
        if(lesson.changeVideo.value === '添加视频'){
            lesson.changeVideo.value = '删除视频'
        }else{
            lesson.changeVideo.value = '添加视频'
        }
        lesson.titleVideo.hide = !lesson.titlePic.hide
        this.setState({
            lesson: lesson
        })
    }

    render(){
        let lesson = this.state.lesson
        let lessonWithKey = []
        for(let key in lesson){
            let lessonElement = {
                id: key,
                ...lesson[key]
            }
            lessonWithKey.push(lessonElement)
        }

        const contentValue = lesson.content.value
        const contentHtml = marked(contentValue)

        return(
            <div>
                <form>
                    {lessonWithKey.map((el)=>{
                        return (
                            <InputLesson
                                key = {el.id}
                                inputType = {el.inputType}
                                placeholder = {el.placeholder}
                                value = {el.value}
                                hide = {el.hide}
                                change = {(event) => this.changeHandler(event,el.id)}
                                onClick = {el.onClick}
                                inputContentDisplay = {contentHtml} />)
                    })}
                </form>
                <Button onClick={this.submitHandler} name='submit'/>
            </div>
        )
    }
}

export default NewLesson;
