import React,{ Component } from 'react';
import Sidebar from './sidebar/sidebar';
import Aux from '../../aux/aux';
import Backdrops from '../../../components/backdrops/backdrops';
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

    showSidebar = () => {
        this.setState((prevState) => ({
            showSidebar: ! prevState.showSidebar
        }))
    }

    hideSidebar = () => {
        this.setState((prevState) => ({
            showSidebar: ! prevState.showSidebar
        }))
    }

    render() {return (
        <Aux>
            <div className={classes.toolbar}>
                <img src={icon} alt='菜单' onClick={this.showSidebar} />
                <p>数据新闻</p>
            </div>
            <div>
                <Backdrops 
                    show={this.state.showSidebar}
                    click={this.hideSidebar}/>
                <Sidebar
                    click={this.hideSidebar}
                    show={this.state.showSidebar}
                    menu={this.state.menu}
                    loginStatus={this.state.loginStatus}
                    userName={this.state.userName} />
            </div>
        </Aux>
    )}
};

export default Toolbar;