import React, { Component}  from 'react'
import axios from '../../axios_data'
import Input from '../inputPost/inputPost'

class VerificationCode extends Component {
    state={
        value: ''
    }

    verifiedPic = () => {
        axios.get('/api/verificationCode', {
            params:{
                code: this.state.value
            }
        }).then(res=>{
            console.log(res.data)
        })
    }

    inputChangeHandler = (event) => {
        let value = event.target.value
        console.log(value)
        this.setState({
            value: value
        })
    }


    render(){
        return(
            <div>
                <Input inputType='text'
                    value={this.state.value}
                    change={(event) => this.inputChangeHandler(event)} />
                <img src='http://localhost:8080/verifiedPic' alt='veri' />
                <button onClick={this.verifiedPic}>yea</button>
            </div>
        )
    }
}

export default VerificationCode