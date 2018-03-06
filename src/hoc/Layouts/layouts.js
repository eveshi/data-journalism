import React from 'react';
import Toolbar from './Toolbar/toolbar';

const layouts = (props) => {
        return (
            <div>
                <Toolbar />
                {props.children}
            </div>
        )
};

export default layouts;