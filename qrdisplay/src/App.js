import React, { Component } from 'react';
import QRContainer from './containers/QRContainer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Scan with your mobile device</h2>
        </div>
        <QRContainer />
      </div>
    );
  }
}

export default App;
