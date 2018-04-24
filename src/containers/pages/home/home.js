import React, { Component } from 'react';
import Headline from '../../../components/headline/headline';
import classes from './home.css';

class Home extends Component {
    state = {
        headlines: [
            {
                order:'1',
                headline: '什么是数据新闻？\n“数据新闻”是指通过使用数据来实现以下一个或多个目标：\n1.帮助读者找到对个人有重要意义的信息；\n2.报道一些重大却鲜为人知的新闻；\n3.帮助读者更好地理解一些复杂的问题。',
                image: 'data'
            },
            {
                order:'2',
                headline: '为什么要做数据新闻？\n数据新闻为把传统的新闻敏感性和有说服力的叙事能力，与海量的数字信息相结合创造了新的可能。',
                image: 'document'
            }
        ],
    }

    render(){
        return(
            <div className={classes.home}>
                {this.state.headlines.map((headline) => {
                    return(
                    <Headline 
                        key={headline.order}
                        order={headline.order}
                        headline={headline.headline}
                        headlinePic={headline.image}/>)
                })}
            </div>
        )
    }
}

export default Home