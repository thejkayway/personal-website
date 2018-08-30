import React, { Component } from 'react';
import P5Wrapper from '../common/P5Wrapper/P5Wrapper';
// art items
import Boids from './Boids/Boids';
import Fluid from './Fluid/Fluid';
import Spirograph from './Spirograph/Spirograph';

import './Art.css';

class Art extends Component {
  render() {
    let choice = this.props.match.params.choice;

    return(
      <div className='art-aligner'>
      {{
        boids: <div>
            <P5Wrapper sketch={Boids} />
            <span className='spirograph_nontouch-device'>click and drag</span>
            <span className='spirograph_touch-device'>touch and drag</span>
          </div>,
        console: "art coming soon: " + choice,
        fluid: <div>
            <Fluid size={20} />
          </div>,
        spirograph: <div>
            <P5Wrapper sketch={Spirograph} />
            <span className='spirograph_nontouch-device'>press spacebar</span>
            <span className='spirograph_touch-device'>touch screen</span>
          </div>,
      }[this.props.match.params.choice]}
      
      </div>
    );
  }
}

export default Art;