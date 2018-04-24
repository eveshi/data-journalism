import React from 'react';
import classes from './button.css'

const button = (props) => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            {props.name}
        </button>
    )
};

export default button;