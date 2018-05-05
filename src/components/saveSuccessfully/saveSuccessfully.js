import React, { Component } from 'react';
import Backdrops from '../backdrops/backdrops';
import Link from '../link/link';
import classes from './saveSuccessfully.css'

class SaveSuccessfully extends Component {
    state={
        seconds: 5,
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            if(this.state.seconds > 0){
                this.setState({
                    seconds: this.state.seconds - 1
                })
            }else if(this.state.seconds === 0){
                window.history.back()
                return false
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
        return true
    }

    render(){
        return(
            <div className={classes.saved}>
                <div className={classes.alertBox}>
                <p>保存成功,{this.state.seconds}后自动返回</p>
                <Link to={this.props.goBackTo}><p>点击快速返回</p></Link>
                </div>
                <Backdrops show={true} />
            </div>
        )
    }
}

export default SaveSuccessfully;
