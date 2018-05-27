import React, { Component } from 'react'
import axios from '../../../axios_data'
import VerificationCode from '../../../components/verificationCode/verificationCode'
import Input from '../../../components/inputPost/inputPost'
import Button from '../../../components/button/button'
import AlertBox from '../../../components/alertBox/alertBox'
import classes from './forgetPassword.css'

class ForgetPassword extends Component {
    state={
        verificationValue: '',
        emailValue: '',
        verified: null,
        refreshCode: false,
    }

    submit = () => {
        axios.defaults.withCredentials = true
        axios.get('/api/verificationCode', {
            params:{
                code: this.state.verificationValue,
            }
        }).then(res=>{
            console.log(res.data)
            if(res.data === 'success'){
                console.log(this.state.emailValue)
            }else{
                this.setState({
                    verified: false
                })
            }
        })
    }

    verificationChangeHandler = (event) => {
        let value = event.target.value
        console.log(value)
        this.setState({
            verificationValue: value,
        })
    }

    emailChangeHandler = (event) => {
        let value = event.target.value
        this.setState({
            emailValue: value,
        })
    }

    refreshCode = () => {
        axios.get('/verifiedPic').then(
            this.setState({
                refreshCode: !this.state.refreshCode
            })
        )
    }

    confirmWrongCode = () => {
        this.refreshCode()
        this.setState({
            verified: null
        })
    }

    render(){
        return(
            <div>
                <VerificationCode 
                    value = {this.state.verificationValue}
                    change = {(event) => this.verificationChangeHandler(event)}
                    refresh={this.state.refreshCode} />
                <Button name='换一张' onClick={this.refreshCode} />
                <Input inputType='text'
                    value = {this.state.emailValue}
                    change = {(event) => this.emailChangeHandler(event)} />
                <Button name='提交' onClick={this.submit} />
                {this.state.verified === false?
                    <AlertBox alertContent='验证码错误'
                        goBackTo = ''
                        nextStep='确定'
                        onClick={this.confirmWrongCode} />:
                    null}
            </div>
        )
    }
}

export default ForgetPassword;