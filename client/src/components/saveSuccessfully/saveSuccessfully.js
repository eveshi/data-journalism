//还是做成弹框形式比较好，然后要有倒数的数字
import React, { Component } from 'react';
import Backdrops from '../backdrops/backdrops';
import Link from '../link/link';
import { setInterval, setTimeout } from 'timers';
import classes from './saveSuccessfully.css'

class SaveSuccessfully extends Component {
    state={
        seconds: 5,
        address: 'http://localhost:3000'
    }

    componentDidMount(){
        console.log('count')
        const timer = setInterval(()=>{
            if(this.state.seconds !== 0){
                this.setState({
                    seconds: this.state.seconds - 1
                })
                console.log(this.state.seconds)
            }else if(this.state.seconds === 0){
                clearInterval(timer)
                window.location.assign(this.state.address+this.props.goBackTo)
            }
        }, 1000)
    }

    render(){
        return(
            <div className={classes.saved}>
                <div className={classes.alertBox}>
                <p>保存成功！{this.state.seconds}秒后自动返回</p>
                <Link to={this.props.goBackTo}><p>点击快速返回</p></Link>
                </div>
                <Backdrops show={true} />
            </div>
        )
    }
}

export default SaveSuccessfully;
