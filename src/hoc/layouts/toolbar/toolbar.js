import React,{ Component } from 'react';
import Sidebar from './sidebar/sidebar';
import Aux from '../../aux/aux';
import Backdrops from '../../../components/backdrops/backdrops';
import classes from './toolbar.css';
import menu from '../../../assets/images/menu.png'

class Toolbar extends Component {
    state = {
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
                <img src={menu} alt='菜单' onClick={this.showSidebar} />
                <p>数据新闻</p>
            </div>
            <div>
                <Backdrops 
                    show={this.state.showSidebar}
                    click={this.hideSidebar}/>
                <Sidebar
                    click={this.hideSidebar}
                    show={this.state.showSidebar}
                    menu={this.state.menu} />
            </div>
        </Aux>
    )}
};

export default Toolbar;