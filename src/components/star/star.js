import React from 'react';
import stared from '../../assets/images/stared.svg';
import unStar from '../../assets/images/unStar.svg';
import classes from './star.css';

const like = (props) => {
    return(
        <div className={classes.star}>
            <button onClick={props.onClick}>
                {props.stared?
                    <img src={stared} alt='liked' />:
                    <img src={unStar} alt='unlike' />}
            </button>
            <p>{props.numbersOfStar}</p>
        </div>
    )
}

export default like;