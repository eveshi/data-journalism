import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from '../pages/page'
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <DocumentTitle title='Data-Journalism'>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </DocumentTitle>
    );
  }
}

export default App;
