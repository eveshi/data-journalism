import React, { Component } from 'react';
import axios from '../../../axios_data';
import Button from '../../../components/button/button'
import marked from 'marked';
import InputPost from '../../../components/inputPost/inputPost';
import classes from './newPost.css';

class NewPost extends Component {
    state = {
        postData: {
            user: {
                inputType: null,
                value: 'admin',
            },
            userProfile: {
                inputType: null,
                value: 'second',
            },
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
            date: {
                inputType: null,
                value: null,
            }
        },
        update: true,
    }

    submitHandler = async() => {
        let postData = this.state.postData
        const date = Date.now()
        postData.date.value = date
        console.log(date)
        let postWillBeSent = {}
        for (let key in postData) {
            let postElement = {}
            postElement[key] = postData[key].value 
            postWillBeSent = {...postWillBeSent, ...postElement}
        }
        console.log(postWillBeSent)
        const request = await axios.post('/api/sendPost',{
            mainContent: postWillBeSent
        })

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

        const contentValue = this.state.postData.content.value
        const contentHtml = marked(contentValue)

        return(
            <div className={classes.newPost}>
                <form>
                    {postData.map((el) => {
                        return (<InputPost
                            key={el.id}
                            name={el.id}
                            inputType={el.inputType}
                            value={el.value}
                            placeholder={el.placeholder}
                            change={(event) => this.changeHandler(event, el.id)}
                            inputContentDisplay={contentHtml} />)}
                    )}
                </form>
                <Button onClick={this.submitHandler} name="提交" />
            </div>
        )
    }
};

export default NewPost;