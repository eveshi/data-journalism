import React from 'react';
import classes from './backdrops.css'

const backdrops = (props) => {
    return (       
        <div 
            className={classes.backdrops}
            style={props.show?{}:{display:'none'}}
            onClick={props.click}>
            {props.children}        
        </div>)
    
};

export default backdrops;