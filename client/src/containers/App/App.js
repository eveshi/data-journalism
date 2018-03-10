import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layouts from '../../hoc/Layouts/layouts';
import NewPost from '../pages/community/newPost/newPost';
import AllPost from '../pages/community/allPosts/allPosts';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layouts>
          <AllPost />
        </Layouts>
      </BrowserRouter>
    );
  }
}

export default App;
