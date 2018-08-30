import React, { Component } from 'react';
import fluidSolver from './fluidSolver';

import './Fluid.css';

class Fluid extends Component {
  constructor(props) {
    super(props);
    this.N = this.props.size;
    this.fluidSolver = new fluidSolver(this.props.size, 1, 1, 1);
    this.density = this.fluidSolver.dyeDensity;
    this.animate();
  }

  animate() {
    this.density = this.fluidSolver.step();
  }

  generateAscii() {
    let asciiText = "";
    for(let y = 0; y < this.props.size; y++) {
      for (let x = 0; x < this.props.size; x++) {
        asciiText = asciiText.concat(this.density[this.fluidSolver.I(x,y)]);
      }
      asciiText = asciiText.concat('\n');
    }
    return <span className="ascii_fluid noselect_fluid">{asciiText}</span>
  }

  render() {
    return(
      <div className="ascii-aligner_fluid">
        {this.generateAscii()}
      </div>
    );
  }
}

export default Fluid;