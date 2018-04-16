import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from '../pages/page'
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    );
  }
}

export default App;
