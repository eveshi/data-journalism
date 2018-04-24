import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './pagesNumber.css';

const pagesNumber = (props) => {
    let pagesNumber = props.pagesNumber
    let pagesArray = []
    let count = 1
    while(pagesNumber>0){
        pagesArray=[
            ...pagesArray,
            count,
        ]
        count = count + 1
        pagesNumber = pagesNumber - 1
    }

    return (
        <div className={classes.pagesNumber}>
            {pagesArray.map((page) => {
                return(<NavLink key={page} to={props.address+'?page='+page}>{page}</NavLink>)
            })}
        </div>
    )
}

export default pagesNumber;