import React, { Component } from 'react';
import axios from '../../axios_data';
import Input from './input/input';
import classes from './newPost.css';

class NewPost extends Component {
    state = {
        postData: {
            title: {
                inputType: 'text',
                placeholder: '标题',
                value: '',
            },
            content: {
                inputType: 'textarea',
                placeholder: '输入内容……',
                value: '',
            },
        },
        update: true,
    }

    submitHandler = async() => {
        console.log(this.state.postData.title.value)

        const title = this.state.postData.title.value
        const content = this.state.postData.content.value

        const request = await axios.post('/api/postdata',{
            user: 'admin',
            title: title,
            content: content,
        })

    }

    clickHandler = async() => {
        const response = await axios.get('/api/test')
        console.log(response.data)
    }
    

    changeHandler = (event, key) => {
        const postData = this.state.postData
        let postElement = postData[key]
        postElement.value = event.target.value
        postData[key] = postElement
        this.setState({
            postData: postData
        })
    }

    render(){
        let postData = []
        for (let key in this.state.postData){
            let postElement = { 
                id: key ,
                ...this.state.postData[key]}
            postData.push(postElement)
        }

        return(
            <div className={classes.newPost}>
                <form onSubmit={this.submitHandler}>
                    {postData.map((el) => {
                        return (<Input
                            key={el.id}
                            name={el.id}
                            value={el.value}
                            placeholder={el.placeholder}
                            change={(event) => this.changeHandler(event, el.id)} />)}
                    )}
                    <button>提交</button>
                </form>
                <button onClick={this.clickHandler}>dian</button>
            </div>
        )
    }
};

export default NewPost;