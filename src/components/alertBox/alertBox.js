import React from 'react';
import Backdrops from '../backdrops/backdrops';
import Link from '../link/link';
import classes from './alertBox.css';

const alertBox = (props) => {
    return(
        <div className={classes.alert}>
            <div className={classes.alertBox}>
            <p>{props.alertContent}</p>
            <p className={classes.alertButton} onClick={this.onClick}>{props.nextStep}</p>
            </div>
            <Backdrops show={true} />
        </div>
    )
}

export default alertBox;