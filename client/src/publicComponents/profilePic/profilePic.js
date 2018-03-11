import React from 'react';
import first from '../../assets/profilePic/1.jpg';
import second from '../../assets/profilePic/2.jpg';
import third from '../../assets/profilePic/3.jpg';
import forth from '../../assets/profilePic/4.jpg';
import fifth from '../../assets/profilePic/5.jpg';
import sixth from '../../assets/profilePic/6.jpg';
import seventh from '../../assets/profilePic/7.jpg';
import eighth from '../../assets/profilePic/8.jpg';
import Aux from '../../hoc/Aux/aux';

const profilePic = (props) => {
    let profileSrc = '';

    switch(props.userProfile){
        case 'first':
            profileSrc = first;
            break;
        case 'second':
            profileSrc = second;
            break;
        case 'third':
            profileSrc = third;
            break;
        case 'forth':
            profileSrc = forth;
            break;
        case 'fifth':
            profileSrc = fifth;
            break;
        case 'sixth':
            profileSrc = sixth;
            break;
        case 'seventh':
            profileSrc = seventh;
            break;
        case 'eighth':
            profileSrc = eighth;
            break;
        default:
            break;   
    }

    return(
        <Aux>
            <img src={profileSrc} alt='profilePic' />
        </Aux>
    )
}

export default profilePic;