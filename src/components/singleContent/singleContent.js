import React from 'react';
import ProfilePic from '../profilePic/profilePic';
import Button from '../button/button'
import classes from './singleContent.css';

const singleContent = (props) => {
    return (
        <div className={classes.singleContent}>
            <ProfilePic userProfile={props.userProfile} />
            <div className={classes.postBox}>
                <div className={classes.headline}>
                    <div className={classes.headlineContent}>
                        <p className={classes.title}>{props.title}</p>
                        <p className={classes.time}>{props.userName}发布于{props.updateTime}</p>
                    </div>
                    <Button name='删除' onClick={props.onClick} style={props.style} />
                </div>
                <div className={classes.content} 
                    dangerouslySetInnerHTML={ {__html: props.content} } />
            </div>
        </div>
    )
};

export default singleContent;

