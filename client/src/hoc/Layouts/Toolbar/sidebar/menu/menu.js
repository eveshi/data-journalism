import React from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../../../Aux/aux';

const menu = (props) => props.menuList.map((el) => {
    return (
        <Aux key={ el.id }>
            <NavLink to={ el.link }>
                { el.name }
            </NavLink>
        </Aux>
    )
});

export default menu;