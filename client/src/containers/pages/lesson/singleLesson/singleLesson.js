import React from 'react';
import play from '../../../../assets/images/play.svg';
import classes from './singleLesson.css';

const singleLesson = (props) => {
    return(
        <div className={classes.title}>
            <div className={classes.titlePic}>
                <img src={props.titlePic} alt='title'/>
                <img src={play} alt='play' />
            </div>
            <div className={classes.titleContent}>
                <p>{props.title}</p>
                <p>发布于{props.uploadTime}前</p>
            </div>
        </div>
    )
};

export default singleLesson;