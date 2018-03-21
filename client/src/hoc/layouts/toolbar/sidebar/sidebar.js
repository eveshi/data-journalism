import React from 'react';
import Menu from './menu/menu';
import UserLog from './userLog/userlog';
import classes from './sidebar.css';

const sidebar = (props) => {
    return(
        <div 
            className={classes.sidebar} 
            style={props.show?{}:{display:'none'}}
            onClick={props.click}>
            <p className={classes.title}>数据新闻</p>
            <Menu menuList={props.menu}/>
            <UserLog 
                loginStatus={props.loginStatus}
                userName={props.userName} />
        </div>
    )
}

export default sidebar;