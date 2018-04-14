import React, { Component } from 'react';
import InputLesson from '../../../components/inputPost/inputPost';

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

    render(){
        return(
            <div>
                <InputLesson />
            </div>
        )
    }
}
