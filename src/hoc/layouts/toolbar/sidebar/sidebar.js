import React from 'react';
import Menu from './menu/menu';
import UserLog from './userLog/userlog';
import icon from '../../../../assets/images/icon.svg';
import classes from './sidebar.css';

const sidebar = (props) => {
    return(
        <div 
            className={classes.sidebar} 
            style={props.show?{}:{display:'none'}}
            onClick={props.click}>
            <p className={classes.title}>DATA-JOURNALISM</p>
            <UserLog 
                loginStatus={props.loginStatus}
                userName={props.userName} />
            <Menu menuList={props.menu}/>
        </div>
    )
}

export default sidebar;