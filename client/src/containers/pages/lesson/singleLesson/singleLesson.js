import React from 'react';
import classes from './singleLesson.css';

const singleLesson = (props) => {
    return(
        <div class={classes.title}>
            <div class={classes.titlePic}>
                <img src={props.titlePic} alt='title'/>
                <img src='../../../../assets/images/play.svg' alt='play' />
            </div>
            <div class={classes.titleContent}>
                <p>{props.title}</p>
                <p>{props.uploadTime}</p>
            </div>
        </div>
    )
};

export default singleLesson;