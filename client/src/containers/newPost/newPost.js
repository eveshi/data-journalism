import React, { Component } from 'react';
import axios from '../../axios_data';
import marked from 'marked';
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

        const contentValue = this.state.postData.content.value
        const contentHtml = marked(contentValue)
        // const contentHtml = content.replace(/\r\n/g, '<br/>')
        console.log(contentHtml)

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
                <pre><div dangerouslySetInnerHTML={ {__html: contentHtml} } /></pre>
                <p>基于Markdown输入</p>
                <button onClick={this.clickHandler}>提交</button>
            </div>
        )
    }
};

export default NewPost;