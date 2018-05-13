import React,{ Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios_data'
import * as actions from '../../../store/action/index'

import UserProfile from '../../../components/profilePic/profilePic'
import Button from '../../../components/button/button'
import AlertBox from '../../../components/alertBox/alertBox'
import Input from '../../../components/inputPost/inputPost'

import ChangeData from '../../../assets/images/write.svg'
import doneEnable from '../../../assets/images/ok_enable.svg'
import classes from './userDetails.css'

class UserDetails extends Component {
    state = {
        changeProfile: false,
        changeUserData: false,
        newProfile: null,
        newName: null,
        newPassword: null,
        profileForm: [
            'first',
            'second',
            'third',
            'forth',
            'fifth',
        ],
        userDataForm: {
            name: {
                inputType: 'text',
                value: '',
                placeholder: '新用户名',
                name: '新用户名',
                type: null,
                isUpToStandard: null,
                alert: '长度在三到八个字符之间',
            },
            password: {
                inputType: 'text',
                value: '',
                placeholder: '新密码',
                name: '新密码',
                type: 'password',
                isUpToStandard: null,
                alert: '需在八个字符之上，且至少有一个数字和英文字符',
            },
            passwordRepeated: {
                inputType: 'text',
                value: '',
                placeholder: '再次输入新密码',
                name: '确认新密码',
                type: 'password',
                isUpToStandard: null,
                alert: '两次密码输入不一致',
            },
        },
        profilePic: null,
        save: false,
        numberOfStared: null,
        numberOfLiked: null,
        numberOfPost: null,
        showStared: null,
        showLiked: null,
        userLiked:[],
        userStared:[],
    }

    componentWillMount(){
        let numberOfLiked = 0
        let numberOfStared = 0
        let numberOfPost = 0
        if(this.props.login === true){
            numberOfLiked = this.props.userData.liked.length
            numberOfStared = this.props.userData.stared.length
            numberOfPost = this.props.userData.post.length
            this.getLikeStaredPost(numberOfLiked, numberOfStared, numberOfPost)
        }
    }

    getLikeStaredPost = async(numberOfLiked, numberOfStared, numberOfPost) => {
        await axios.post('/api/getUserLikeStaredPost', {
            userLiked: this.props.userData.liked,
            userStared: this.props.userData.stared,
            userPost: this.props.userData.post,
        }).then((response)=>{
            const data = response.data
            this.setState({
                profilePic: this.props.userData.profilePic,
                numberOfLiked: numberOfLiked,
                numberOfStared: numberOfStared,
                numberOfPost: numberOfPost,
                userLiked: data.userLikedDetails,
                userStared: data.userStaredDetails
            })
        })
    }

    profileChangeHandler = () => {
        this.setState({
            changeProfile: !this.state.changeProfile
        })
    }

    userDataChnageHandler = () => {
        this.setState({
            changeUserData: !this.state.changeUserData
        })
    }

    profileChoose = (profilePic) => {
        this.setState({
            profilePic: profilePic
        })
    }

    changeHandler = (event, key) => {
        const value = event.target.value
        switch(key){
            case 'name':
                const nameReg = /\w{3,8}/;
                if(nameReg.test(value) === false &&
                    value !== ''){
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            name:{
                                ...this.state.userDataForm.name,
                                isUpToStandard: false,
                                value: value
                            }
                        }
                    })
                }else{
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            name:{
                                ...this.state.userDataForm.name,
                                isUpToStandard: true,
                                value: value
                            }
                        }
                })};
                break;
            case 'password':
                const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if(passwordReg.test(value) === false &&
                    value !== ''){
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            password:{
                                ...this.state.userDataForm.password,
                                isUpToStandard: false,
                                value: value
                            }
                        }
                    })
                }else{
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            password:{
                                ...this.state.userDataForm.password,
                                isUpToStandard: true,
                                value: value
                            }
                        }
                    })
                }
                break;
            case 'passwordRepeated':
                if(value !== this.state.userDataForm.password.value &&
                    value !== ''){
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            passwordRepeated:{
                                ...this.state.userDataForm.passwordRepeated,
                                isUpToStandard: false,
                                value: value
                            }
                        }
                    })
                }else if(value === this.state.userDataForm.password.value){
                    this.setState({
                        userDataForm: {
                            ...this.state.userDataForm,
                            passwordRepeated:{
                                ...this.state.userDataForm.passwordRepeated,
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
    }

    submitProfileChange = () => {
        this.setState({
            changeProfile: !this.state.changeProfile,
        })
        this.submitAllChanges(this.state.profilePic)
    }

    submitUserDataChange = () => {
        this.setState({
            changeUserData: !this.state.changeUserData
        })
        this.submitAllChanges(null, this.state.userDataForm.name.value, this.state.userDataForm.password.value)
    }

    submitAllChanges = (profilePic, name, password) => {
        console.log('aubmit')
        axios.post('/api/changeUserData', {
            profilePic: profilePic,
            name: name,
            password: password,
            email: this.props.userData.email
        }).then((response) => {
            const userData = response.data
            console.log(userData)
            this.props.loginSuccessfully(userData)
            this.setState({
                save: true
            })
        })
    }

    saveComfirm = () => {
        this.setState({
            userDataForm: {
                name: {
                    inputType: 'text',
                    value: '',
                    placeholder: '新用户名',
                    name: '新用户名',
                    type: null,
                    isUpToStandard: null,
                    alert: '长度在三到八个字符之间',
                },
                password: {
                    inputType: 'text',
                    value: '',
                    placeholder: '新密码',
                    name: '新密码',
                    type: 'password',
                    isUpToStandard: null,
                    alert: '需在八个字符之上，且至少有一个数字和英文字符',
                },
                passwordRepeated: {
                    inputType: 'text',
                    value: '',
                    placeholder: '再次输入新密码',
                    name: '确认新密码',
                    type: 'password',
                    isUpToStandard: null,
                    alert: '两次密码输入不一致',
                },
            },
            save: false,
        })
    }

    showLikedHandler = () => {
        this.setState({
            showLiked: ! this.state.showLiked,
            showStared: false,
        })
    }

    showStaredHandler = () => {
        this.setState({
            showStared: ! this.state.showStared,
            showLiked: false,
        })
    }

    render(){
        const changeProfileForm = this.state.profileForm.map((profilePic) => {
            return(
                <button key={profilePic}
                    className={classes.profilePicChange}
                    onClick={ () => this.profileChoose(profilePic) }>
                    <UserProfile userProfile={profilePic} />
                </button>)
        })

        const changeUserDataForm = Object.keys(this.state.userDataForm).map((key) => {
            return (
                <div key={key}>
                    <div className={classes.singleItem}
                    style={this.state.userDataForm[key].inputType?{}:{display:'none', height:'0px'}}>
                        <p>
                            {this.state.userDataForm[key].name}:
                        </p>
                        <Input
                        inputType = {this.state.userDataForm[key].inputType}
                        placeholder = {this.state.userDataForm[key].placeholder}
                        value={this.state.userDataForm[key].value}
                        change={(event) => this.changeHandler(event, key)}
                        type={this.state.userDataForm[key].type}
                        style={this.state.userDataForm[key].isUpToStandard===false?
                            {borderBottom:'2px solid red',color:'red'}:{}} />
                    </div>
                    {this.state.userDataForm[key].isUpToStandard===false?
                        <p className={classes.signinAlert}>{this.state.userDataForm[key].alert}</p>:
                        null} 
                </div>)
        })

        let canUserSubmit = 'disabled'

        if((this.state.userDataForm.name.isUpToStandard !== false &&
            this.state.userDataForm.password.isUpToStandard !== false &&
            this.state.userDataForm.passwordRepeated.isUpToStandard !== false) &&
            (this.state.userDataForm.name.isUpToStandard !== null || 
            this.state.userDataForm.password.isUpToStandard !== null ||
            this.state.userDataForm.passwordRepeated.isUpToStandard !== null)&&
            (this.state.userDataForm.name.value !== '' || 
            this.state.userDataForm.password.value !== '' ||
            this.state.userDataForm.passwordRepeated.value !== '') &&
            (this.state.userDataForm.password.isUpToStandard ===
            this.state.userDataForm.passwordRepeated.isUpToStandard)){
                canUserSubmit = null
            }

        const likedForm = this.state.userLiked.map((item) => {

        })

        const staredForm = this.state.userStared.map((item) => {

        })

        return(
            <div className={classes.wholePage}>
                <div className={classes.bigProfile}>
                    <UserProfile
                        userProfile={this.state.profilePic} 
                        onClick={this.profileChangeHandler} />
                </div>
                {this.state.changeProfile?
                    <div className={classes.changeProfile}>
                        {changeProfileForm}
                        <button onClick={this.submitProfileChange}>
                            <img src={doneEnable} alt='submit new profile' />
                        </button>
                    </div>:null}
                <div className={classes.userData}>
                    <div className={classes.changeUserData}>
                        <p className={classes.userName}>{this.props.userData.name}</p>
                        <img className={classes.changeDataIcon}
                            src={ChangeData} 
                            alt='change user data' 
                            onClick={this.userDataChnageHandler} />
                    </div>
                    {this.state.changeUserData?
                        <div>
                            <form>
                                {changeUserDataForm}
                            </form>
                            <Button name='更新数据' onClick={this.submitUserDataChange} 
                                disabled={canUserSubmit}
                                style={canUserSubmit==='disabled'?
                                    {backgroundColor:'beige', color:'#bdbcbc'}:null}/>
                        </div>:null}
                </div>
                <div className={classes.likedStaredPost}>
                    <Button name={'发布     '+this.state.numberOfPost}
                        onClick={this.showStaredHandler}></Button>
                    <Button name={'收藏     '+this.state.numberOfStared}
                        onClick={this.showStaredHandler}></Button>
                    <Button name={'赞    '+this.state.numberOfLiked}
                        onClick={this.showLikedHandler}></Button>
                </div>
                {this.state.showStared?
                    <div>
                        {likedForm}
                    </div>:null}
                {this.state.showLiked?
                    <div>
                        {staredForm}
                    </div>:null}
                {this.state.save?
                    <AlertBox alertContent='修改成功' 
                        nextStep='确定'
                        goBackTo=''
                        onClick={this.saveComfirm} />:null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        userData: state.userData
    }
}

const mapActionsToProps = dispatch => {
    return {
        loginSuccessfully: (userData) => dispatch(actions.loginSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(UserDetails)