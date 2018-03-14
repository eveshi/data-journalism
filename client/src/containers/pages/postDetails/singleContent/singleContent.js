import React from 'react';
import ProfilePic from '../../../../components/profilePic/profilePic';
import classes from './singleContent.css';

const singleContent = (props) => {
    return (
        <div className={classes.singleContent}>
            <ProfilePic userProfile={props.userProfile} />
            <div className={classes.postBox}>
                <div className={classes.headline}>
                    <p className={classes.title}>{props.title}</p>
                    <p className={classes.time}>{props.userName}发布于{props.updateTime}前</p>
                </div>
                <div className={classes.content} 
                    dangerouslySetInnerHTML={ {__html: props.content} } />
            </div>
        </div>
    )
};

export default singleContent;

