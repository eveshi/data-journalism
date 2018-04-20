//还是做成弹框形式比较好，然后要有倒数的数字
import React, { Component } from 'react';
import Backdrops from '../backdrops/backdrops';
import Link from '../link/link';
import { setInterval } from 'timers';
import classes from './saveSuccessfully.css'

class SaveSuccessfully extends Component {
    state={
        seconds: 5
    }

    // componentDidMount(){
    //     let seconds = this.state.seconds
    //     setInterval(this.countTime(seconds),1000)
    // }

    countTime = (seconds) => {
        if(seconds === 0){
            clearInterval();
            Window.location.assing(this.props.originAddress)
        }else{
            seconds = seconds - 1
            this.setState({
                seconds: seconds
            })
        }
    }

    render(){
        return(
            <div>
                <div className={classes.alertBox}>
                <p>保存成功！{this.state.seconds}秒后自动返回</p>
                <Link to='http://localhost:3000/post'><p>点击快速返回</p></Link>
                </div>
                <Backdrops show={true} />
            </div>
        )
    }
}

export default SaveSuccessfully;
