import React from 'react';
import { Link } from 'react-router-dom';
import classes from './link.css';

const link = (props) => {
    return (
        <Link to={props.to} classes={classes.link}>
            {props.children}
        </Link>
    )
}

export default link;