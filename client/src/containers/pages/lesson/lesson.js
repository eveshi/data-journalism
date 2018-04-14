// 如果是视频教学的话，就是上面是视频，下面是标题，点开直接播放视频。文字教学的话，就是点开是文字详情，那么就是上面是图片，下面是标题，没有图片的话，就是自动的一个图。

import React, { Component } from 'react';
import SingleLesson from './singleLesson/singleLesson';

class Lesson extends Component {
    state = {
        lessons: []
    }

    componentWillMount(){

    }

    getLesson = async() => {

    }

    render(){
        return(this.state.lessons.map((lesson) => {
            return(
                <div>
                    <SingleLesson />
                </div>
            )
        })
        )
    }
}

export default Lesson;