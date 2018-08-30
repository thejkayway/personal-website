import React, { Component } from 'react';
import './AsciiFace.css';
import CatAsciiXLarge from './CatAscii.xlarge';
import CatAsciiLarge from './CatAscii.large';
import CatAsciiMedium from './CatAscii.medium';
import CatAsciiSmall from './CatAscii.small';
import CatAsciiXSmall from './CatAscii.xsmall';

class AsciiFace extends Component {
  render() {
    return (
      <div className='ascii-aligner_home'>
        <div className='ascii_home noselect'><CatAsciiXLarge/></div>
      </div>
    );
  }
}

export default AsciiFace;