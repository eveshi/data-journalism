import React from 'react';
import play from '../../../../assets/images/play.svg';
import classes from './singleLesson.css';

const singleLesson = (props) => {
    return(
        <div className={classes.singleLesson}>
            <div className={classes.titlePic}>
                <img id='titlePic' src={props.titlePic} alt='title'/>
                <p>内含视频</p>
            </div>
            <div className={classes.titleContent}>
                <p className={classes.title}>{props.title}</p>
                <p className={classes.time}>发布于{props.uploadTime}前</p>
            </div>
        </div>
    )
};

export default singleLesson;