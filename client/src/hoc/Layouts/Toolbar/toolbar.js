import React,{ Component } from 'react';
import Sidebar from './sidebar/sidebar';
import Aux from '../../Aux/aux';
import Backdrops from '../../../publicComponents/backdrops/backdrops';
import classes from './toolbar.css';
import icon from '../../../assets/images/menu.png';

class Toolbar extends Component {
    state = {
        menu: [
            { id:'home', name:'主页', link:'/home' },
            { id:'news', name:'数据新闻', link:'/news' },
            { id:'lesson', name:'教学', link:'/lesson' },
            { id:'community', name:'社区', link:'/community' },            
            { id:'about', name:'关于', link:'/about' },
        ],
        loginStatus: true,
        userName: 'eve',
        showSidebar: false,
    }

    showMenu = () => {
        this.setState((prevState) => ({
            show: ! prevState.show
        }))
    }

    hideMenu = () => {
        this.setState((prevState) => ({
            show: ! prevState.show
        }))
    }

    render() {return (
        <Aux>
            <div className={classes.toolbar}>
                <img src={icon} alt='菜单' onClick={this.showMenu} />
                <p>数据新闻</p>
            </div>
            <div>
                <Backdrops 
                    show={this.state.showSidebar}
                    click={this.hideMenu}/>
                <Sidebar 
                    show={this.state.showSidebar}
                    menu={this.state.menu}
                    loginStatus={this.state.loginStatus}
                    userName={this.state.userName} />
            </div>
        </Aux>
    )}
};

export default Toolbar;