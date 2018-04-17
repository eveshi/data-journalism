import React, { Component } from 'react';
import axios from '../../../axios_data';
import SingleLesson from './singleLesson/singleLesson';
import classes from './lesson.css';

class Lesson extends Component {
    state = {
        lessons: []
    }

    componentWillMount(){
        console.log('will mount')
        this.getLesson().then((lessons) => {
            console.log(lessons)
            this.setState({
                lessons: lessons
            })
        })
    }

    getLesson = async() => {
        console.log('get lesson')
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
                            title={lesson.title}
                            titlePic={lesson.titlePic}
                            uploadTime={lesson.time}/>)
                })}
            </div>
        )
    }
}

export default Lesson;