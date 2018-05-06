import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlertBox from '../alertBox/alertBox';
import add from '../../assets/images/add.svg';
import classes from './addNew.css'

class AddNew extends Component{
    state = {
        showLoginAlert: false
    }

    loginAlertHandler = () => {
        this.setState({
            showLoginAlert: ! this.state.showLoginAlert
        })
    }

    render(){
        let renderContent =  null      

        if(this.props.login === true){
            renderContent = (
                <Link to={this.props.link} className={classes.addNew}>
                    <img src={add} alt='add' /> 
                </Link>
            )
        }else{
            renderContent = (
                <div className={classes.addNew}>
                    <img onClick={this.loginAlertHandler} src={add} alt='add' />
                    {this.state.showLoginAlert?
                        <AlertBox alertContent='发布帖子请先登陆' 
                            nextStep='确定' 
                            onClick={this.loginAlertHandler} 
                            goBackTo=''/>
                        :null}       
                </div>
            )
        }

        return(
            <div>
                {renderContent}
            </div>
        )
    }
} 

export default AddNew;