import React,{ Component } from 'react';
import axios from '../../../axios_data';
import SingleContent from './singleContent/singleContent';
import InputPost from '../../../components/inputPost/inputPost';

class PostDetails extends Component {
    state = {

    }

    componentWillMount(){
        console.log(this.props.location.search)
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getPost(id).then((el) =>{
            console.log(el)
        })
    }   

    getPost = async(id) => {
        console.log('enter')
        console.log(id)
        const response = await axios.get('/api/postDetails',{
            params:{
                id: id
            }
        })
        console.log(response.data)
        return response.data
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