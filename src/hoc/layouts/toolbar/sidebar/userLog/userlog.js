import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/action/index';
import ProfilePic from '../../../../../components/profilePic/profilePic';
import classes from './userlog.css';
import Aux from '../../../../aux/aux';

class UserLog extends Component {
    render(){
        return(
            <Aux>
                <div className={classes.logout} 
                    style={this.props.login? {}:{display:'none'}}>
                    <NavLink to={'/user/'+this.props.userData.name}>
                        <ProfilePic userProfile={this.props.userData.profilePic} />
                        <p>{this.props.userData.name}</p>
                    </NavLink>
                    <NavLink className={classes.logoutButton}
                        to='/home'
                        onClick={this.props.logout}>登出</NavLink>
                </div>           
                <div className={classes.login} 
                    style={this.props.login? {display:'none'}:{}}>
                    <NavLink to={'/signin'}>登入/注册</NavLink>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        userData: state.userData
    }
}

const mapActionToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapActionToProps)(UserLog);