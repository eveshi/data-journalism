import React from 'react';
import classes from './input.css';

const inputValue = (props) => {
    const type = props.inputType;
    let InputContent = null;
    switch(type){
        case 'text':
            InputContent = <input
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.change} />;
            break;
        case 'textarea':
            InputContent = <textarea
                className = {classes.inputContent}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.change}  />;
            break;
        default: 
            break;     
    }

    return(
        <div>
            {InputContent}
        </div>
    )
};

export default inputValue;