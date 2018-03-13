import React from 'react';
import classes from './inputPost.css';

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
            InputContent = (
                <div>
                <textarea
                    className = {classes.inputContent}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.change}  />
                <div dangerouslySetInnerHTML={ {__html: props.inputContentDisplay} } />
                <p>基于Markdown输入</p>
                </div>);
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