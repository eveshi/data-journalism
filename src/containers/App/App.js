import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layouts from '../../hoc/Layouts/layouts';
import Posts from '../posts/posts'
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layouts>
          <Posts />
        </Layouts>
      </BrowserRouter>
    );
  }
}

export default App;
