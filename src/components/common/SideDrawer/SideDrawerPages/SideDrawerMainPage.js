import React, { Component } from 'react';

import './SideDrawerDropdown.css';
import Link from 'react-router-dom/Link';

class SideDrawerDropDown extends Component {
  render() {
    let dropdownClass = 'side-drawer-dropdown';
    if (this.props.show) {
      dropdownClass = 'side-drawer-dropdown open';
    }
    return(
      <div className={dropdownClass}>
        <ul>
          <li><Link to='/art/console'>console</Link></li>
          <li><Link to='/art/fluid'>fluid</Link></li>
        </ul>
      </div>
    );
  }
}

export default SideDrawerDropDown;