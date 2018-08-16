import React, { Component } from 'react';
import './Art.css';

class Art extends Component {
  render() {
    return(
      <div className='art-aligner'>
      art coming soon: {this.props.match.params.choice}
      </div>
    );
  }
}

export default Art;