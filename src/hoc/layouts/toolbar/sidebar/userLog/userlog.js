import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../../../aux/aux';

class UserLog extends Component {
    render(){
        return(
            <Aux>
                <div style={this.props.login? {}:{display:'none'}}>
                    <p>用户：{this.props.userData.name}</p>
                    <p>登出</p>
                </div>           
                <div style={this.props.login? {display:'none'}:{}}>
                    <NavLink to={'/signin'}>登入</NavLink>
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

export default connect(mapStateToProps)(UserLog);