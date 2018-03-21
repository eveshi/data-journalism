import React from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../../../Aux/aux';

const userlog = (props) => {
    return (
        <Aux>
            <div style={props.loginStatus? {}:{display:'none'}}>
                <p>用户：{props.userName}</p>
                <p>登出</p>
            </div>           
            <div style={props.loginStatus? {display:'none'}:{}}>
                <NavLink to={'/login'}>登入</NavLink>
            </div>
        </Aux>
    )
};

export default userlog;