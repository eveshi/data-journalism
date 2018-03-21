import React from 'react';
import Toolbar from './Toolbar/toolbar';
import classes from './layouts.css';

const layouts = (props) => {
        return (
            <div>
                <Toolbar />
                <div className={classes.content}>
                {props.children}
                </div>
            </div>
        )
};

export default layouts;