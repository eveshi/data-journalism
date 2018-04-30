import React, { Component } from 'react';
import { connect } from 'react-redux'

import Input from '../../../components/inputPost/inputPost'
import Button from '../../../components/button/button'
import * as actions from '../../../store/action/index'

class LoginOrSignin extends Component {
    state={
        loginData:{
            loginEmail: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
                type: null
            },
            loginPassword: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
                type: 'password',
            }},
        signinData:{
            name: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
                type: null,
            },
            email: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
                type: null,
            },
            password: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
                type: 'password',
            },
            passwordRepeated: {
                inputType: 'text',
                value: '',
                placeholder: 'test',
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
        console.log(this.props.userData)
    }

    loginSubmitHandler = () => {
        this.props.login('login')
        console.log(this.props.userData)
    }

    render(){
        const signinForms = Object.keys(this.state.signinData).map((key) => {
            return <Input key={key}
            inputType = {this.state.signinData[key].inputType}
            placeholder = {this.state.signinData[key].placeholder}
            value={this.state.signinData[key].value}
            change={(event) => this.changeHandler(event, 'signinData', key)}
            type={this.state.signinData[key].type} />
        })

        const loginForms = Object.keys(this.state.loginData).map((key) => {
            return <Input key={key}
            inputType = {this.state.loginData[key].inputType}
            placeholder = {this.state.loginData[key].placeholder}
            value={this.state.loginData[key].value}
            change={(event) => this.changeHandler(event, 'loginData', key)}
            type={this.state.loginData[key].type} />
        })

        return(
            <div>
                <form>
                    {signinForms}
                </form>
                <Button name='注册' onClick={this.signinSubmitHandler} />
                <a href=''>已有账户，现在登录</a>
                <form>
                    {loginForms}
                </form>
                <Button name='登录' onClick={this.loginSubmitHandler} />
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
        login: (userData) => dispatch(actions.login(userData))
    }
}

export default connect(mapStateToProps, mapActionToProps)(LoginOrSignin)