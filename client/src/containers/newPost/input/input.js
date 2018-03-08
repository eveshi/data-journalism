import React from 'react';

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
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.change}  />;
            break;
        default:
            InputContent = <input
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.change}  />; 
            break;     
    }

    return(
        <div>
            {InputContent}
        </div>
    )
};

export default inputValue;