import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios_data';
import bcrypt from 'bcryptjs';

import Input from '../../../components/inputPost/inputPost'
import Button from '../../../components/button/button'
import AlertBox from '../.././../components/alertBox/alertBox'
import Link from '../../../components/link/link'
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
                type: null,
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
                isUpToStandard: null,
                alert: '长度在三到八个字符之间',
            },
            email: {
                inputType: 'text',
                value: '',
                placeholder: '请输入注册邮箱……',
                name: '邮箱',
                type: null,
                isUpToStandard: null,
                alert: '邮箱格式不对',
            },
            password: {
                inputType: 'text',
                value: '',
                placeholder: '请输入密码……',
                name: '密码',
                type: 'password',
                isUpToStandard: null,
                alert: '需在八个字符之上，且至少有一个数字和英文字符',
            },
            passwordRepeated: {
                inputType: 'text',
                value: '',
                placeholder: '请再次输入密码……',
                name: '确认密码',
                type: 'password',
                isUpToStandard: null,
                alert: '两次密码输入不一致',
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
        },
        loginFail: null,
        signinFail: null,
        signinSuccess: null,
        hashRounds: 10,
    }

    changeHandler = (event, dataSource, key) => {
        const value = event.target.value
        switch(dataSource){
            case 'signinData':
                switch(key){
                    case 'name':
                        const nameReg = /\w{3,8}/;
                        if(nameReg.test(value) === false){
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    name:{
                                        ...this.state.signinData.name,
                                        isUpToStandard: false,
                                        value: value
                                    }
                                }
                            })
                        }else{
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    name:{
                                        ...this.state.signinData.name,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }
                        })};
                        break;
                    case 'email':
                        const emailReg = /.*@\w*[.]\w*/;
                        if(emailReg.test(value) === false){
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    email:{
                                        ...this.state.signinData.email,
                                        isUpToStandard: false,
                                        value: value
                                    }}
                                })
                        }else{
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    email:{
                                        ...this.state.signinData.email,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }})
                        }
                        break;
                    case 'password':
                        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                        if(passwordReg.test(value) === false){
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    password:{
                                        ...this.state.signinData.password,
                                        isUpToStandard: false,
                                        value: value
                                    }
                                }
                            })
                        }else{
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    password:{
                                        ...this.state.signinData.password,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }
                            })
                        }
                        break;
                    case 'passwordRepeated':
                        if(value !== this.state.signinData.password.value){
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    passwordRepeated:{
                                        ...this.state.signinData.passwordRepeated,
                                        isUpToStandard: false,
                                        value: value
                                    }
                                }
                            })
                        }else if(value === this.state.signinData.password.value){
                            this.setState({
                                signinData: {
                                    ...this.state.signinData,
                                    passwordRepeated:{
                                        ...this.state.signinData.passwordRepeated,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }
                            })
                        };
                        break;
                    default:
                        break;
                }
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
        const salt = bcrypt.genSaltSync(this.state.hashRounds)
        Object.assign(signinData, this.state.signinData)
        Object.keys(signinData).map((key) => {
            if(key === 'password'){
                const password = bcrypt.hashSync(signinData.password.value, salt)
                const item = {password: password}
                newUser={...newUser, ...item}
            }else{
                const item = {[key]: signinData[key].value}
                newUser={...newUser, ...item}
            }
        })
        axios.post('/api/signin', {
            newUser: newUser
        }).then((response) => {
            const message = response.data
            if(message === 'The email has been registered'){
                this.setState({
                    signinFail: true
                })
            }else if(message === 'Successfully Registered'){
                this.setState({
                    signinSuccess: true
                })
            }
        })
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
                this.setState({
                    loginFail: true
                })
            }else if(message === 'invalid email'){
                this.setState({
                    loginFail: true
                })
            }else{
                this.props.loginSuccessfully(message)
                window.history.back()
            }
        })
    }

    loginFailComfirm = () => {
        this.setState({
            loginFail: false
        })
    }

    signinFailComfirm = () => {
        this.setState({
            signinFail: false
        })
    }

    signinSuccessComfirm = () => {
        window.location.reload()
    }

    render(){
        const signinForms = Object.keys(this.state.signinData).map((key) => {
            return (
                <div key={key}>
                    <div className={classes.singleItem}
                    style={this.state.signinData[key].inputType?{}:{display:'none', height:'0px'}}>
                        <p>
                            {this.state.signinData[key].name}:
                        </p>
                        <Input
                        inputType = {this.state.signinData[key].inputType}
                        placeholder = {this.state.signinData[key].placeholder}
                        value={this.state.signinData[key].value}
                        change={(event) => this.changeHandler(event, 'signinData', key)}
                        type={this.state.signinData[key].type}
                        style={this.state.signinData[key].isUpToStandard===false?
                            {borderBottom:'2px solid red',color:'red'}:{}} />
                    </div>
                    {this.state.signinData[key].isUpToStandard===false?
                        <p className={classes.signinAlert}>{this.state.signinData[key].alert}</p>:
                        null} 
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

        let canUserSubmit = 'disabled'

        if(this.state.signinData.name.isUpToStandard &&
            this.state.signinData.email.isUpToStandard &&
            this.state.signinData.password.isUpToStandard &&
            this.state.signinData.passwordRepeated.isUpToStandard){
                canUserSubmit = null
            }

        return(
            <div className={classes.pageDesign}>
                <div className={classes.signin}>
                    <p className={classes.head}>注册</p>
                    <form>
                        {signinForms}
                    </form>
                    <Button name='注册数据新闻网' onClick={this.signinSubmitHandler} 
                        disabled={canUserSubmit}
                        style={canUserSubmit==='disabled'?
                            {backgroundColor:'beige', color:'#bdbcbc'}:null}/>
                    <a href='#login'>已有账户，现在登录</a>
                </div>
                <div id='login' className={classes.login}>
                    <p className={classes.head}>登陆</p>
                    <form>
                        {loginForms}
                    </form>
                    <Button name='登录数据新闻网' onClick={this.loginSubmitHandler} />
                    <Link to='/forgetPassword'>忘记密码</Link>
                </div>
                {this.state.loginFail === true?
                    <AlertBox alertContent='邮箱或密码错误，请重试' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.loginFailComfirm} />:null}
                {this.state.signinFail === true?
                    <AlertBox alertContent= '邮箱已占用，请重试' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.signinFailComfirm} />:null}
                {this.state.signinSuccess === true?
                    <AlertBox alertContent='注册成功，重新登录' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.signinSuccessComfirm} />:null}               
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