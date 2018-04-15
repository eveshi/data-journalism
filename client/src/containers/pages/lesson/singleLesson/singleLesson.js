import React from 'react';
import classes from './singleLesson.css';

const singleLesson = (props) => {
    return(
        <div className={classes.title}>
            <div className={classes.titlePic}>
                <img src={props.titlePic} alt='title'/>
                <img src='../../../../assets/images/play.svg' alt='play' />
            </div>
            <div className={classes.titleContent}>
                <p>{props.title}</p>
                <p>{props.uploadTime}</p>
            </div>
        </div>
    )
};

export default singleLesson;