// 如果是视频教学的话，就是上面是视频，下面是标题，点开直接播放视频。文字教学的话，就是点开是文字详情，那么就是上面是图片，下面是标题，没有图片的话，就是自动的一个图。

import React, { Component } from 'react';
import axios from '../../../axios_data';
import SingleLesson from './singleLesson/singleLesson';

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
            <div>
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