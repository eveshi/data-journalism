import React from 'react';
import PorfilePic from '../../../components/profilePic/profilePic'
import classes from './about.css'

const about = () => {
    return(
        <div className={classes.about}>
            <PorfilePic userProfile='sixth' />
            <p className={classes.name}>@Eve Shi</p>
            <p>Programmer</p>
            <p>Location: Hong Kong</p>
            <p>Email: qianyiwork@gmail.com</p>
        </div>
    )
}

export default about;