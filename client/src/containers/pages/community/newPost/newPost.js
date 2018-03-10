import React, { Component } from 'react';
import axios from '../../../../axios_data';
import marked from 'marked';
import Input from './input/input';
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
                value: '../../../../assets/profilePic/2.jpg',
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
        const postWillBeSent = []
        for (let key in postData) {
            let postElement = {
                id: key,
                value: postData[key].value
            }
            postWillBeSent.push(postElement)
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
                        return (<Input
                            key={el.id}
                            name={el.id}
                            inputType={el.inputType}
                            value={el.value}
                            placeholder={el.placeholder}
                            change={(event) => this.changeHandler(event, el.id)} />)}
                    )}
                </form>
                <div dangerouslySetInnerHTML={ {__html: contentHtml} } />
                <p>基于Markdown输入</p>
                <button onClick={this.submitHandler}>提交</button>
            </div>
        )
    }
};

export default NewPost;