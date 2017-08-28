import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MotionContainer from './containers/MotionContainer'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>Change device orientation!</h2>
          </div>
          <MotionContainer />
        </div>
      </Router>
    );
  }
}

export default App;
