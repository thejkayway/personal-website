import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Spirograph from './Spirograph/Spirograph'
import './Art.css';

class Art extends Component {
  render() {
    let choice = this.props.match.params.choice;

    return(
      <div className='art-aligner'>
      {{
        console: "art coming soon: " + choice,
        fluid: "art coming soon: " + choice,
        spirograph: <div>
            <P5Wrapper sketch={Spirograph} />
            press spacebar
          </div>,
      }[this.props.match.params.choice]}
      
      </div>
    );
  }
}

export default Art;