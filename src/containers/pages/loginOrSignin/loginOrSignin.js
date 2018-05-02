import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios_data';

import Input from '../../../components/inputPost/inputPost'
import Button from '../../../components/button/button'
import * as actions from '../../../store/action/index'
import classes from './loginOrSignin.css'

class LoginOrSignin extends Component {
    state={
        loginData:{
            email: {
                inputType: 'text',
                value: '',
                placeholder: '注册邮箱……',
                name: '邮箱',
                type: null
            },
            password: {
                inputType: 'text',
                value: '',
                placeholder: '输入密码……',
                name: '密码',
                type: 'password',
            }},
        signinData:{
            name: {
                inputType: 'text',
                value: '',
                placeholder: '请输入用户名……',
                name: '用户名',
                type: null,
            },
            email: {
                inputType: 'text',
                value: '',
                placeholder: '请输入注册邮箱……',
                name: '邮箱',
                type: null,
            },
            password: {
                inputType: 'text',
                value: '',
                placeholder: '请输入密码……',
                name: '密码',
                type: 'password',
            },
            passwordRepeated: {
                inputType: 'text',
                value: '',
                placeholder: '请再次输入密码……',
                name: '确认密码',
                type: 'password',
            },
            profilePic: {
                inputType: null,
                value: 'first',
            },
            stared: {
                inputType: null,
                value: [],
            },
            liked: {
                inputType: null,
                value: [],
            },
            post: {
                inputType: null,
                value: [],
            },
            category:{
                inputType: null,
                value: 'basic',
            }
        }
    }

    changeHandler = (event, dataSource, key) => {
        const value = event.target.value
        switch(dataSource){
            case 'signinData':
                this.setState({
                    signinData: {
                        ...this.state.signinData,
                        [key]:{
                            ...this.state.signinData[key],
                            value: value
                        }
                    }
                });
                break;
            case 'loginData':
                this.setState({
                    loginData: {
                        ...this.state.loginData,
                        [key]:{
                            ...this.state.loginData[key],
                            value: value
                        }
                    }
                });
                break;
            default:
                return false
        }
    }

    signinSubmitHandler = () => {
        let signinData = {}
        let newUser = {}
        Object.assign(signinData, this.state.signinData)
        Object.keys(signinData).map((key) => {
            const item = {[key]: signinData[key].value}
            console.log(item)
            newUser={...newUser, ...item}
        })
        axios.post('/api/signin', {
            newUser: newUser
        }).then((response) => {
            const message = response.data
            if(message === 'The email has been registered'){
                console.log(message)
                alert('该邮箱已注册')
            }else if(message === 'Successfully Registered'){
                console.log(message)
                alert('注册成功')
                window.history.back()
            }
        })
        // this.props.signin(newUser)
    }

    loginSubmitHandler = () => {
        let loginData = {}
        let oldUser = {}
        Object.assign(loginData, this.state.loginData)
        Object.keys(loginData).map((key) => {
            const item = {[key]: loginData[key].value}
            oldUser = {...oldUser, ...item}
        })
        axios.post('/api/login', {
            oldUser: oldUser
        }).then((response) => {
            const message = response.data
            if(message === 'wrong password'){
                alert('密码错误')
            }else if(message === 'invalid email'){
                alert('邮箱不存在')
            }else{
                this.props.loginSuccessfully(message)
                window.history.back()
            }
        })
    }

    render(){
        const signinForms = Object.keys(this.state.signinData).map((key) => {
            return (
                <div key={key} className={classes.singleItem}
                style={this.state.signinData[key].inputType?{}:{display:'none', height:'0px'}}>
                    <p>
                        {this.state.signinData[key].name}:
                    </p>
                    <Input
                    inputType = {this.state.signinData[key].inputType}
                    placeholder = {this.state.signinData[key].placeholder}
                    value={this.state.signinData[key].value}
                    change={(event) => this.changeHandler(event, 'signinData', key)}
                    type={this.state.signinData[key].type} />
                </div>)
        })

        const loginForms = Object.keys(this.state.loginData).map((key) => {
            return (
                <div key={key} className={classes.singleItem}>
                    <p>{this.state.loginData[key].name}:</p>
                    <Input
                    inputType = {this.state.loginData[key].inputType}
                    placeholder = {this.state.loginData[key].placeholder}
                    value={this.state.loginData[key].value}
                    change={(event) => this.changeHandler(event, 'loginData', key)}
                    type={this.state.loginData[key].type} />
                </div>)
        })

        return(
            <div className={classes.pageDesign}>
                <div className={classes.signin}>
                    <p className={classes.head}>注册</p>
                    <form>
                        {signinForms}
                    </form>
                    <Button name='注册数据新闻网' onClick={this.signinSubmitHandler} />
                    <a href='#login'>已有账户，现在登录</a>
                </div>
                <div id='login' className={classes.login}>
                    <p className={classes.head}>登陆</p>
                    <form>
                        {loginForms}
                    </form>
                    <Button name='登录数据新闻网' onClick={this.loginSubmitHandler} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const mapActionToProps = dispatch => {
    return {
        loginSuccessfully: (userData) => dispatch(actions.loginSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionToProps)(LoginOrSignin)