import React,{ Component } from 'react';
import axios from '../../../../../axios_data';
import SingleContent from './singleContent/singleContent';
import InputPost from '../../../../../publicComponents/inputPost/inputPost'

class PostDetails extends Component {
    state = {

    }

    componentWillMount(){
        console.log(this.props.location.search)
        const params = this.props.location.search
        const id = new URLSearchParams(params)
        console.log(id)
    }   

    getPost = async() => {
        const response = await axios.get('')
        console.log(response.data)
    }

    render(){
        return(
            <div>
                <SingleContent />
                <InputPost />
            </div>
        )
    }
};

export default PostDetails;