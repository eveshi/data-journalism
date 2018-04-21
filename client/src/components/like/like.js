import React from 'react';
import liked from '../../assets/images/liked.svg';
import unLike from '../../assets/images/unLike.svg';
import classes from './like.css';

const like = (props) => {
    return(
        <div className={classes.like}>
            <button onClick={props.onClick}>
                {props.liked?
                    <img src={liked} alt='liked' />:
                    <img src={unLike} alt='unlike' />}
            </button>
            <p>{props.numbersOfLike}</p>
        </div>
    )
}

export default like;