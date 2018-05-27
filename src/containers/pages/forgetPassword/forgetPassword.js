import React, { Component } from 'react'
import axios from '../../../axios_data'
import VerificationCode from '../../../components/verificationCode/verificationCode'
import Input from '../../../components/inputPost/inputPost'
import Button from '../../../components/button/button'
import classes from './forgetPassword.css'

axios.defaults.withCredentials = true

class ForgetPassword extends Component {
    state={
        verificationValue: '',
        emailValue: '',
    }

    submit = () => {
        axios.get('/api/verificationCode', {
            params:{
                code: this.state.verificationValue,
            }
        }).then(res=>{
            console.log(res.data)
            if(res.data === 'success'){
                console.log(this.state.emailValue)
            }else{
                console.log('fail')
            }
        })
    }

    verificationChangeHandler = (event) => {
        const value = event.target.value
        this.setState({
            verificationValue: value,
        })
    }

    emailChangeHandler = (event) => {
        const value = event.target.value
        this.setState({
            emailValue: value,
        })
    }

    changeCode = () => {
        this.setState({
            emailValue: ''
        })
    }

    render(){
        return(
            <div>
                <VerificationCode 
                    value = {this.state.verificationValue}
                    onChange = {(event) => this.verificationChangeHandler(event)}/>
                <Button name='换一张' onClick={this.changeCode} />
                <Input inputType='text'
                    value = {this.state.emailValue}
                    change = {(event) => this.emailChangeHandler(event)} />
                <Button name='提交' onClick={this.submit} />
            </div>
        )
    }
}

export default ForgetPassword;