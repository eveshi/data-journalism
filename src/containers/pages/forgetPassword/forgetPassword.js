import React, { Component } from 'react'
import axios from '../../../axios_data'
import bcrypt from 'bcryptjs';
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
        isEmailValid: null,
        showInputEmailCode: null,
        emailCodeValue: '',
        isEmailCodeValid: null,
        showInputNewPassword: null,
        passwordValue:{
            inputType: 'text',
            value: '',
            placeholder: '新密码',
            name: '新密码',
            type: 'password',
            isUpToStandard: null,
            alert: '需在八个字符之上，且至少有一个数字和英文字符',
        },
        submitPasswordSuccess: null,
        showInputEmail: true,
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
                axios.get('/api/findEmail',{
                    params:{
                        email: this.state.emailValue
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data === true){
                        axios.post('/api/sendVerifiedEmail', {
                            email: this.state.emailValue
                        }).then((res) => {
                            if(res.data === true){
                                this.setState({
                                    showInputEmailCode: true,
                                    showInputEmail: false
                                })
                            }
                        })
                    }else{
                        this.setState({
                            isEmailValid: false
                        })
                    }
                })
            }else{
                this.setState({
                    verified: false
                })
            }
        })
    }

    verificationChangeHandler = (event) => {
        let value = event.target.value
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

    emailCodeChangeHandler = (event) => {
        let value = event.target.value
        this.setState({
            emailCodeValue: value,
        })
    }

    passwordChangeHandler = (event) => {
        const value = event.target.value
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(passwordReg.test(value) === false &&
            value !== ''){
            this.setState({
                passwordValue:{
                    ...this.state.passwordValue,
                    isUpToStandard: false,
                    value: value
                }
            })
        }else{
            this.setState({
                    passwordValue:{
                        ...this.state.passwordValue,
                        isUpToStandard: true,
                        value: value
                    }
                })
        }
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

    confirmWrongEmail = () => {
        this.refreshCode()
        this.setState({
            isEmailValid: null,
        })
    }

    submitEmailCode = () => {
        axios.post('/api/checkEmailCode',{
            code: this.state.emailCodeValue,
            email: this.state.emailValue
        }).then((res) => {
            if(res.data === true){
                this.setState({
                    showInputNewPassword: true,
                    showInputEmailCode: null
                })
            }else{
                this.setState({
                    isEmailCodeValid: false,
                    showInputEmailCode: null,
                    showInputEmail: true,
                })
            }
        })
    }

    submitNewPassword = () => {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(this.state.passwordValue.value, salt)
        axios.post('/api/changeUserData', {
            password: password,
            email: this.state.emailValue
        }).then((response) => {
            const userData = response.data
            console.log(userData)
            this.setState({
                submitPasswordSuccess: true
            })
        })
    }

    confirmWrongEmailCode = () => {
        this.refreshCode()
        this.setState({
            isEmailCodeValid: null
        })
    }

    render(){
        return(
            <div className={classes.wholePage}>
                {this.state.showInputEmail === true?
                    <div>
                        <div className={classes.verificationCode}>
                            <p>验证码：</p>
                            <VerificationCode 
                                value = {this.state.verificationValue}
                                change = {(event) => this.verificationChangeHandler(event)}
                                refresh={this.state.refreshCode} />
                            <Button name='换一张' onClick={this.refreshCode} />
                        </div>
                        <div className={classes.inputEmail}>
                            <p>注册所用邮箱：</p>
                            <Input inputType='text'
                                value = {this.state.emailValue}
                                change = {(event) => this.emailChangeHandler(event)} />
                        </div>
                        <Button name='提交' onClick={this.submit} />
                    </div>:
                    null}
                {this.state.verified === false?
                    <AlertBox alertContent='验证码错误'
                        goBackTo = ''
                        nextStep='确定'
                        onClick={this.confirmWrongCode} />:
                    null}
                {this.state.isEmailValid === false?
                    <AlertBox alertContent='该邮箱未注册'
                        goBackTo = ''
                        nextStep='确定'
                        onClick={this.confirmWrongEmail} />:
                    null}
                {this.state.showInputEmailCode === true?
                    <div>
                        <p>验证码已发送至注册邮箱，请输入收到的验证码：</p>
                        <Input inputType = 'text'
                            change = {(event) => this.emailCodeChangeHandler(event)}
                            value = {this.state.emailCodeValue} />
                        <Button name='确定' onClick={this.submitEmailCode} />
                    </div>:
                    null}
                {this.state.isEmailCodeValid === false?
                    <AlertBox alertContent='验证码错误，请重试'
                        goBackTo = ''
                        nextStep='确定'
                        onClick={this.confirmWrongEmailCode} />:
                    null}
                {this.state.showInputNewPassword === true?
                    <div>
                        <p>输入您的新密码：</p>
                        <div>
                            <div className={classes.singleItem}>
                                <Input
                                inputType = {this.state.passwordValue.inputType}
                                placeholder = {this.state.passwordValue.placeholder}
                                value={this.state.passwordValue.value}
                                change={(event) => this.passwordChangeHandler(event)}
                                type={this.state.passwordValue.type}
                                style={this.state.passwordValue.isUpToStandard===false?
                                    {borderBottom:'2px solid red',color:'red'}:{}} />
                            </div>
                            {this.state.passwordValue.isUpToStandard===false?
                                <p className={classes.passwordAlert}>{this.state.passwordValue.alert}</p>:
                                null} 
                        </div>
                        <Button name='确定' onClick={this.submitNewPassword} />
                    </div>:
                    null}
                {this.state.submitPasswordSuccess === true?
                    <AlertBox alertContent='修改成功'
                        goBackTo = '/home'
                        netStepWithLink = '确定' />:
                    null}
            </div>
        )
    }
}

export default ForgetPassword;