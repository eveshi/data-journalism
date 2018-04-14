import React, { Component } from 'react';
import axios from 'axios';
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
            conmment:{
                inputType: null,
                value: [],
            }
        }
    }

    submitHandler = () => {
        const lesson = this.state.lesson
        this.uploadLesson(lesson)
    }

    uploadLesson = async(lesson) => await axios.post('/api/sendLesson',{
        lesson: lesson
    })

    render(){
        return(
            <div>
                <form>
                    {this.state.lesson.map((el)=>{
                        <InputLesson />
                    })}
                </form>
                <Button onClick={this.submitHandler} name='submit'/>
            </div>
        )
    }
}
