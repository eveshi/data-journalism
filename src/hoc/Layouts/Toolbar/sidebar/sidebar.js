import React, { Component } from 'react';
import Menu from './menu/menu';
import UserLog from './userLog/userlog';
import classes from './sidebar.css';

class Sidebar extends Component {
    state = {
        menu: [
            { id:'home', name:'主页', link:'/home' },
            { id:'news', name:'数据新闻', link:'/news' },
            { id:'lesson', name:'教学', link:'/lesson' },
            { id:'about', name:'关于', link:'/about' },
        ],
        loginStatus: true,
        userName: 'eve',
    }

    render(){
        return(
            <div className={classes.sidebar}>
                <p className={classes.title}>数据新闻</p>
                <Menu menuList={this.state.menu}/>
                <UserLog 
                    loginStatus={this.state.loginStatus}
                    userName={this.state.userName} />
            </div>
        )
    }
}

export default Sidebar;