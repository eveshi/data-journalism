//还是做成弹框形式比较好，然后要有倒数的数字
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
            console.log('still running')
            if(this.state.seconds > 0){
                this.setState({
                    seconds: this.state.seconds - 1
                })
                console.log(this.state.seconds)
            }else if(this.state.seconds === 0){
                window.history.back()
                console.log(this.state.seconds)
                return false
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
        console.log("unmount")
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
