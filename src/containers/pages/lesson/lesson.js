import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios_data';
import SingleLesson from './singleLesson/singleLesson';
import Button from '../../../components/button/button';
import AddNew from '../../../components/addNew/addNew';

import classes from './lesson.css';

class Lesson extends Component {
    state = {
        lessons: [],
        page: 0,
        noMorePage: false,
    }

    componentWillMount(){
        let page = 0
        this.getLesson(page).then((lessons) => {
            page = page + 1
            this.setState({
                lessons: lessons,
                page: page
            })
        })
    }

    getLesson = async(page) => {
        const response = await axios.get('/api/getLesson',{
            params:{
                page: page
            }
        })
        const data = response.data
        return data
    }

    showMore = () => {
        let page = this.state.page
        this.getLesson(page).then((moreLessons)=>{
            let noMorePage = false
            if(moreLessons === [] || moreLessons.length < 5){
                noMorePage = true
            }
            page = page + 1
            this.setState({
                lessons: [
                    ...this.state.lessons,
                    ...moreLessons,
                ],
                page: page,
                noMorePage: noMorePage
            })
        })
    }

    render(){
        let showAddNew = true
        if(this.props.userData.category !== 'admin'){
            showAddNew = false
        }

        return(
            <div className={classes.lessonsPage}>
                <div className={classes.lessons}>
                    {this.state.lessons.map((lesson) => {
                        return(
                            <SingleLesson 
                                key={lesson.key}
                                address={lesson.id}
                                title={lesson.title}
                                titlePic={lesson.titlePic}
                                uploadTime={lesson.time}
                                containVideo={lesson.titleVideo !== '' && lesson.titleVideo?true:false}/>)
                    })}
                </div>
                {showAddNew?
                    {}:
                    <AddNew login={this.props.login}
                        link='/lessons/newlesson'/>}
                {this.state.noMorePage?
                    <div className={classes.noMoreBox}><p>没有更多了……</p></div>:
                    <Button onClick={this.showMore} name='加载更多'/>} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Lesson);