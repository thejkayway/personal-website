import React, { Component } from 'react';

class FluidAscii extends Component {
  render() {
    return (
      <div id="ascii-container">
        <div id="ascii-main" style="opacity: 1;">
          <div id="ascii-card" class="overlay">
            <dl>
              <dd>"People create programs to direct processes. In effect, we conjure the spirits of the computer with our spells."</dd>
              <dt>—The Structure &amp; Interpretationof Computer Programs</dt>
            </dl>
          </div>
          <div id="ascii-controls" class="overlay"><button>"Disappear!"</button></div>
          </div><p id="ascii-fluid"></p></div>
    );
  }
}

export default FluidAscii;