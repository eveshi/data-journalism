import React from 'react';
import { Link } from 'react-router-dom';
import classes from './singleLesson.css';

const singleLesson = (props) => {
    return(
        <Link to={'/lessons/lesson?id='+props.address} className={classes.singleLesson}>
            <div className={classes.titlePic}>
                <img id='titlePic' src={props.titlePic} alt='title'/>
                <p>内含视频</p>
            </div>
            <div className={classes.titleContent}>
                <p className={classes.title}>{props.title}</p>
                <p className={classes.time}>发布于{props.uploadTime}前</p>
            </div>
        </Link>
    )
};

export default singleLesson;