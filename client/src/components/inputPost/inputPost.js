import React from 'react';
import Aux from '../../hoc/aux/aux';
import classes from './inputPost.css';
import Button from '../button/button';

const inputValue = (props) => {
    const type = props.inputType;
    let InputContent = null;
    switch(type){
        case 'text':
            InputContent = <input
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.change}
                style={props.hide?{display:'none'}:{}} />;
            break;
        case 'textarea':
            InputContent = (
                <div className={classes.inputBox}>
                    <div className={classes.textarea}>
                        <textarea
                            className = {classes.inputContent}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.change}  />
                        <div dangerouslySetInnerHTML={ {__html: props.inputContentDisplay} }
                            className={classes.display} />
                    </div>
                    <p className={classes.caption}>采用 Markdown 输入</p>
                </div>
            );
            break;
        case 'button':
            InputContent = (
                <Button onClick={props.onClick} name={props.value}/>
            );
            break;
        default: 
            break;     
    }

    return(
        <Aux>
            {InputContent}
        </Aux>
    )
};

export default inputValue;