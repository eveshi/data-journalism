import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index'
import axios from '../../../axios_data';
import Button from '../../../components/button/button'
import marked from 'marked';
import AlertBox from '../../../components/alertBox/alertBox';
import InputPost from '../../../components/inputPost/inputPost';
import SaveSuccessfully from '../../../components/saveSuccessfully/saveSuccessfully';
import classes from './newPost.css';

class NewPost extends Component {
    state = {
        postData: {
            userEmail: {
                inputType: null,
                value: '',
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
            time: {
                inputType: null,
                value: null,
            },
            comment:{
                inputType: null,
                value: [],
            }
        },
        update: true,
        submitted: false,
        wordsCount: null,
        unLoginAlert: false
    }

    componentWillMount(){
        if(this.props.login === false){
            this.setState({
                unLoginAlert: true
            })
        }
    }

    submitHandler = async() => {
        let postData = {...this.state.postData}
        postData.userEmail.value = this.props.userData.email
        const time = Date.now()
        postData.time.value = time
        let postWillBeSent = {}
        for (let key in postData) {
            let postElement = {}
            postElement[key] = postData[key].value 
            postWillBeSent = {...postWillBeSent, ...postElement}
        }
        this.setState({
            submitted: true
        })
        const request = await axios.post('/api/sendPost',{
            mainContent: postWillBeSent,
            userEmail: this.props.userData.email
        })
        const userData = request.data
        this.props.loginSuccessfully(userData)
    }

    changeHandler = (event, key) => {
        const postData = this.state.postData
        let postElement = postData[key]
        postElement.value = event.target.value
        postData[key] = postElement
        this.setState({
            postData: postData
        })
        if(key === 'content'){
            const wordsCount = postData.content.value.length
            this.setState({
                wordsCount: wordsCount
            })
        }
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
                            inputContentDisplay={contentHtml}
                            wordsCount={this.state.wordsCount} />)}
                    )}
                </form>
                <Button onClick={this.submitHandler} name="提交" />
                {this.state.submitted === true?
                    <SaveSuccessfully goBackTo='/community' /> : null}
                {this.state.unLoginAlert === true?
                    <AlertBox alertContent='请登录后再进行操作' 
                        nextStepWithLink='返回主页'
                        goBackTo='/home'/>:null}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

const mapActionsToProps = dispatch => {
    return {
        loginSuccessfully: (userData) => dispatch(actions.loginSuccessfully(userData))     
    }
}

export default connect(mapStateToProps, mapActionsToProps)(NewPost);