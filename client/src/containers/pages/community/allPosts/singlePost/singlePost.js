import React from 'react';
import ProfilePic from '../../../../../publicComponents/profilePic/profilePic';
import commentPic from '../../../../../assets/images/comment.png';
import { Link } from 'react-router-dom';
import classes from './singlePost.css'

const singlePost = (props) => {
    return(
        <Link to={'/community/post?id='+props.id} className={classes.singlePost}>
            <div className={classes.user}>
                <ProfilePic userProfile={props.userProfile} />
                <p>{props.userName}</p>
            </div>
            <div className={classes.content}>
                <p className={classes.title}>{props.title}</p>
                <p className={classes.updateTime}>发布于{props.updateTime}前</p>
            </div>
            <div className={classes.comment}>
                <img src={commentPic} alt="commentIcon" />
                <p>{props.commentNumber}</p>
            </div>
        </Link>
    )
};


export default singlePost;