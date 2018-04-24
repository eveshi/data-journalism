import React from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../../../aux/aux';
import classes from './menu.css';

const menu = (props) => props.menuList.map((el) => {
    return (
        <Aux key={ el.id }>
            <NavLink to={ el.link } className={classes.menu} activeClassName={classes.active}>
                <p>{ el.name }</p>
            </NavLink>
        </Aux>
    )
});

export default menu;