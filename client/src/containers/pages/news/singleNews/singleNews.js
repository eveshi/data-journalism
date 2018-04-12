import React from 'react';

const singleNews = (props) => {
    return(
        <div>
            <div>
                <img src={props.titlePic} alt='title'/>
                <p>{props.title}</p>
                <p>{props.uploadTime}</p>
            </div>
            <p>{props.caption}</p>
        </div>
    )
};

export default singleNews;

