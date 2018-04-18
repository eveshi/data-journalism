import React,{ Component } from 'react';
import axios from '../../../axios_data';
import SingleContent from '../../../components/singleContent/singleContent';

class LessonDetails extends Component {
    state = {
        content: []
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const id = new URLSearchParams(paramsGet).get('id')
        this.getDetails(id).then((content)=>{
            this.setState({
                content: content
            })
        })
    }

    getDetails = async(id) => {
        const response = await axios.get('/api/getLessonDetails',{
            params:{
                id: id
            }
        })
        const content = response.value
        return content
    }

    render(){
        return(
            <div>
                <p>test</p>
                {this.state.content.map((comment) => {
                    return(
                        <SingleContent />
                    )
                })}
            </div>
        )
    }
}

export default LessonDetails;