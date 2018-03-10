import React from 'react';

const singlePost = (props) => {
    return(
        <div>
            <div>
                <img src='' alt='userProfile' />
                <p>{props.userName}</p>
            </div>
            <div>
                <p>{props.title}</p>
                <p>{props.updateTime}</p>
            </div>
            <div>
                <img src='' alt='commentIcon' />
                <p>{props.commentNumber}</p>
            </div>
        </div>
    )
};

export default singlePost;