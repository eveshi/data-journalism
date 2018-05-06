import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios_data';
import SinglePost from './singlePost/singlePost';
import Aux from '../../../hoc/aux/aux';
import PagesNumber from '../../../components/pagesNumber/pagesNumber';
import AddNew from '../../../components/addNew/addNew';
import classes from './community.css';

class Community extends Component {
    state = {
        posts: [],
        pagesNumber: null,
        itemInEveryPage: 7,
    }

    componentWillMount(){
        this.mountPost(this.props)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.Props){
            this.mountPost(nextProps)
        }
    }

    mountPost = (props) => {
        const paramsGet = props.location.search
        const pageGet = new URLSearchParams(paramsGet).get('page')
        let page = 1
        if(pageGet){
            page = pageGet
        } 
        this.getPost(page,this.state.itemInEveryPage).then((postsData) => {
            const pagesNumber = Math.ceil(postsData.totalNumber/6)
            this.setState({
                posts: postsData.postSentBack,
                pagesNumber: pagesNumber,
            })
        })
    }

    getPost = async(page,itemInEveryPage) =>{
        const response = await axios.get('/api/getPost',{
            params:{
                page: page,
                itemInEveryPage: itemInEveryPage
            }
        })
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
                                userName={el['user']}
                                title={el['title']}
                                updateTime={el['time']}
                                commentNumber={commentNumber} /> 
                        </div>
                    )
                })}
                <AddNew login={this.props.login}
                        link='/community/newpost'/>
                <PagesNumber 
                    pagesNumber={this.state.pagesNumber}
                    address='/community/page' />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Community);