import React, { Component } from 'react';
import axios from '../../../axios_data';
import SinglePost from './singlePost/singlePost';
import Aux from '../../../hoc/aux/aux';
import classes from './community.css';

class Community extends Component {
    state = {
        posts: []
    }

    componentWillMount(){
        this.getPost().then((postsData) => {
            let posts = []
            postsData.map((el,index) => {
                const mainContent = el['mainContent']
                const dateUpload = mainContent['date'];
                const dateNow = Date.now();
                const datePassed = ((dateNow - dateUpload)/1000).toFixed(0);
                let datePassedString = '';
                if (datePassed < 60){
                    datePassedString = datePassed + '秒'
                }else if(datePassed < 60*60){
                    datePassedString = (datePassed/60).toFixed(0) + '分'
                }else if(datePassed < 60*60*24){
                    datePassedString = (datePassed/(60*60)).toFixed(0) + '小时'
                }else if(datePassed < 60*60*24*30){
                    datePassedString = (datePassed/(60*60*24)).toFixed(0) + '天'
                }else if(datePassed < 60*60*24*365){
                    datePassedString = (datePassed/(60*60*24*30)).toFixed(0) + '月'
                }else{
                    datePassedString = (datePassed/(60*60*24*365)).toFixed(0) + '年'
                }
                const postElement = {
                    key: el['_id'],
                    userProfile: mainContent['userProfile'],
                    userName: mainContent['user'],
                    title: mainContent['title'],
                    time: datePassedString,
                    commentNumber: 0,
                }
                posts.push(postElement)
            })
            this.setState({
                posts: posts
            })
        })
    }

    getPost = async() =>{
        const response = await axios.get('/api/getPost',{})
        return response.data;
    }

    render(){
        return(
            <Aux>
                {this.state.posts.map((el) => {
                    return (
                        <div key={el['key']} className={classes.singlePost}>
                            <SinglePost
                                id={el['key']}
                                userProfile={el['userProfile']}
                                userName={el['userName']}
                                title={el['title']}
                                updateTime={el['time']} /> 
                        </div>
                    )
                })}
            </Aux>
        )
    }
}

export default Community;