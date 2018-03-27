import React, { Component } from 'react';
import axios from 'axios';

class News extends Component {
    state={
        news: []
    }

    componentWillMount(){
        this.getNews().then((newsData) => {
            this.setState({
                news: newsData
            })
        })
    }

    getNews = async() => {
        const response = await axios.get('api/getNews')
        return response.data
    }

    render(){
        return(
            <div></div>
        )
    }
};

export default News;

