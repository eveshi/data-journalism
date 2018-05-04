import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './menu.css';

import home from '../../../../../assets/images/home.svg';
import lesson from '../../../../../assets/images/lesson.svg';
import community from '../../../../../assets/images/community.svg';
import about from '../../../../../assets/images/about.svg';

class Menu extends Component {
    state = {
        menu: [
            { id:'home', name:'主页', link:'/home', icon: home },
            { id:'lessons', name:'教学', link:'/lessons', icon: lesson },
            { id:'community', name:'社区', link:'/community', icon: community},            
            { id:'about', name:'关于', link:'/about', icon: about },
        ]
    }

    render(){
        return(
            this.state.menu.map((el) => {
                return(
                    <div key={ el.id } className={classes.singleMenu}>
                        <img src={el.icon} alt='icon'/>
                        <NavLink to={ el.link } activeClassName={classes.active}>
                            <p>{ el.name }</p>
                        </NavLink>
                    </div> 
                )
            })
        )
    }
}

export default Menu;