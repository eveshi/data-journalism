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
                placeholder: '',
                value: '',
            },
            content:{
                inputType:'textarea',
                placeholder: '',
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
        }
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
        let value = event.value
    } 

    render(){
        let lesson = this.state.lesson
        for(let key in lesson){
            lesson = {
                id: key,
                ...lesson
            }
        }

        const contentValue = lesson.content.value
        const contentHtml = marked(contentValue)

        return(
            <div>
                <form>
                    {lesson.map((el)=>{
                        return (
                            <InputLesson
                                key = {el.id}
                                inputType = {el.inputType}
                                placeholder = {el.placeholder}
                                value = {el.value}
                                change = {(event) => this.changeHandler(event,el.id)}
                                inputContentDisplay = {contentHtml} />)
                    })}
                </form>
                <Button onClick={this.submitHandler} name='submit'/>
            </div>
        )
    }
}

export default NewLesson;
