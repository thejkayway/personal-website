import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import Viewport from './Viewport';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Viewport />
      </div>
    );
  }
}

export default App;