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
            // addPicture:{
            //     inputType:'button',
            //     value: '添加题图',
            // },
            titleVideo:{
                inputType:'text',
                placeholder: '输入视频地址(仅限Youtube）……',
                value: '',
                hide: true,
            },
            // addVideo:{
            //     inputType:'button',
            //     value:'添加视频',
            // },
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
        show: true,
    }

    componentWillMount(props){
        console.log('will monut')
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     return false
    // }

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

    addMedia = (id) => {
        if(id === 'addPicture'){
            this.addTitlePicture()
        }else if(id === 'addVideo'){
            this.addTitleVideo()
        }
    }

    addTitlePicture = () => {
        let lesson = this.state.lesson
        // if(lesson.addPicture.value === '添加题图'){
        //     lesson.addPicture.value = '删除题图'
        // }else{
        //     lesson.addPicture.value = '添加题图'
        // }
        lesson.titlePic.hide = !lesson.titlePic.hide
        this.setState({
            lesson: lesson
        })
        // this.setState((prevState) => ({
        //     show: ! prevState.show
        // }))
        // console.log(this.state.show)
    }

    addTitleVideo = () => {
        let lesson = this.state.lesson
        // if(lesson.addVideo.value === '添加视频'){
        //     lesson.addVideo.value = '删除视频'
        // }else{
        //     lesson.addVideo.value = '添加视频'
        // }
        lesson.titleVideo.hide = !lesson.titlePic.hide
        this.setState({
            lesson: lesson
        })
        // this.setState((prevState) => ({
        //     show: ! prevState.show
        // }))
        // console.log(this.state.show)
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

        let button1 = '添加题图'
        let button2 = '添加视频'

        if(lesson.titlePic.hide === false){
            button1 = '删除'
        }

        if(lesson.titleVideo.hide === false){
            button1 = '删除'
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
                                onClick = {() => this.addMedia(el.id)}
                                inputContentDisplay = {contentHtml} />)
                    })}
                </form>
                <Button onClick={this.addTitlePicture} name={button1} />
                <Button onClick={this.addTitleVideo} name={button2} />
                <Button onClick={this.submitHandler} name='提交'/>
            </div>
        )
    }
}

export default NewLesson;
