import React, { Component } from 'react';
import './AboutMe.css';

class AboutMe extends Component {
  render() {
    return (
      <div className='aboutme-aligner'>
        <ul>
          <li>jonathan kay</li>
          <li><a href='https://github.com/bellyjeans55'>github</a></li>
        </ul>
      </div>
    );
  }
}

export default AboutMe;