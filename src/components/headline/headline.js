import React from 'react';
import data from '../../assets/images/data.svg';
import document from '../../assets/images/document.svg';
import classes from './headline.css'

const headline = (props) => {
    let headlinePic
    switch(props.headlinePic){
        case 'data':
        headlinePic = data;
        break;
    case 'document':
        headlinePic = document;
        break;
    default:
        break;  
    }

    return(
        <div className={classes.headline} style={props.order%2===0?{backgroundColor:'rgba(206, 234, 234, 0.41)'}:{backgroundColor:'white'}}>
            <img src={headlinePic} alt='headline' />
            <div dangerouslySetInnerHTML={ {__html: props.headline} }
                            className={classes.headlineContent} />
        </div>
    )
};

export default headline;