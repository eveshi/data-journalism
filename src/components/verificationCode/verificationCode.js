import React, { Component } from 'react'
import Input from '../inputPost/inputPost'

class VerificationCode extends Component {
    state={
        randomNumber: 123456
    }

    componentWillUpdate(nextProps){
        if(this.props.refresh !== nextProps.refresh){
            this.setState({
                randomNumber: Math.floor(Math.random()*100000)
            })
        }
    }

    render(){
        return(
            <div>
            <Input inputType='text'
                value={this.props.value}
                change={this.props.change} />
            <img src={'http://localhost:8080/verifiedPic?_='+this.state.randomNumber} 
                alt='veri' />
        </div>
        )
    }
}

export default VerificationCode