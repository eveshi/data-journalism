import React from 'react';
import { Link } from 'react-router-dom';
import add from '../../assets/images/add.svg';
import classes from './addNew.css'

const addNew = (props) => {
    return(
        <Link to={props.link} className={classes.addNew}>
            <img src={add} alt='add' /> 
        </Link>
    )
}

export default addNew;