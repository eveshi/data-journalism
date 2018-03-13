import React from 'react';
import ProfilePic from '../../../../components/profilePic/profilePic';
import classes from './singleContent.css';

const singleContent = (props) => {
    return (
        <div>
            <div>
                <ProfilePic src={props.userProfile}/>
                <div>
                    <p>{props.title}</p>
                    <p>{props.userName}发布于{props.updateTime}前</p>
                </div>
            </div>
            <p>{props.content}</p>
        </div>
    )
};

export default singleContent;