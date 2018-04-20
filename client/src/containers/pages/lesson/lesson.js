import React, { Component } from 'react';
import axios from '../../../axios_data';
import SingleLesson from './singleLesson/singleLesson';
import classes from './lesson.css';

class Lesson extends Component {
    state = {
        lessons: []
    }

    componentWillMount(){
        this.getLesson().then((lessons) => {
            this.setState({
                lessons: lessons
            })
        })
    }

    getLesson = async() => {
        const response = await axios.get('/api/getLesson',{})
        const data = response.data
        return data
    }

    render(){
        return(
            <div className={classes.lesson}>
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
        )
    }
}

export default Lesson;