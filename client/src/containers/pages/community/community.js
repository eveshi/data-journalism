import React, { Component } from 'react';
import axios from '../../../axios_data';
import SinglePost from './singlePost/singlePost';
import Aux from '../../../hoc/aux/aux';
import Button from '../../../components/button/button';
import PagesNumber from '../../../components/pagesNumber/pagesNumber';
import classes from './community.css';
import { URLSearchParams } from 'url';

class Community extends Component {
    state = {
        posts: [],
        pagesNumber: null,
        itemInEveryPage: 7,
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        let page = 1
        // if(new URLSearchParams(paramsGet).get('page')){
        //     page = new URLSearchParams(paramsGet).get('page')
        // } 
        console.log(page)
        this.getPost(page,this.state.itemInEveryPage).then((postsData) => {
            const pagesNumber = Math.ceil(postsData.totalNumber/6)
            this.setState({
                posts: postsData.postSentBack,
                pagesNumber: pagesNumber,
            })
            console.log(postsData)
        })
    }

    getPost = async(page,itemInEveryPage) =>{
        const response = await axios.get('/api/getPost',{
            params:{
                page: page,
                itemInEveryPage: itemInEveryPage
            }
        })
        console.log(response.data)
        return response.data;
    }

    render(){
        return(
            <Aux>
                {this.state.posts.map((el) => {
                    let commentNumber = 0
                    if(el.comment){
                        commentNumber = el.comment.length
                    }
                    return (
                        <div key={el['key']} className={classes.singlePost}>
                            <SinglePost
                                id={el['id']}
                                userProfile={el['userProfile']}
                                userName={el['userName']}
                                title={el['title']}
                                updateTime={el['time']}
                                commentNumber={commentNumber} /> 
                        </div>
                    )
                })}
                <PagesNumber 
                    pagesNumber={this.state.pagesNumber}
                    address='/community' />
            </Aux>
        )
    }
}

export default Community;