import React from 'react';
import Backdrops from '../backdrops/backdrops';
import Link from '../link/link';
import classes from './alertBox.css';

const alertBox = (props) => {
    return(
        <div className={classes.alert}>
            <div className={classes.alertBox}>
                <p>{props.alertContent}</p>
                {props.specialContent}
                <Link to={props.goBackTo}
                    style={props.ifLink?null:{display:'none'}}>
                    <p className={classes.alertButton}>{props.nextStepWithLink}</p>
                </Link>
                <p className={classes.alertButton} onClick={props.onClick}>
                    {props.nextStep}
                </p>
            </div>
            <Backdrops show={true} />
        </div>
    )
}

export default alertBox;