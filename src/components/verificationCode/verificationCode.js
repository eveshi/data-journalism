import React from 'react'
import Input from '../inputPost/inputPost'

const verificationCode = (props) => {
    return(
        <div>
            <Input inputType='text'
                value={props.value}
                change={props.onChange} />
            <img src='http://localhost:8080/verifiedPic' alt='veri' />
        </div>
    )
}

export default verificationCode