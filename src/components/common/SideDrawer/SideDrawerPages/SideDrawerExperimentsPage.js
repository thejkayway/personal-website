import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import './SideDrawerExperimentsPage.css';

class SideDrawerExperimentsPage extends Component {
  render() {
    let pageClasses = 'side-drawer_experiments-page';
    if (!this.props.show) {
      pageClasses = 'side-drawer_experiments-page hide';
    }
    return (
      <div className={pageClasses}>
        <ul>
          <li className='side-drawer_back-button back' onClick={this.props.navClick}>⇐</li>
          <li><Link to='/art/boids' onClick={this.props.sidebarClosingClick}>boids</Link></li>
          <li><Link to='/art/console' onClick={this.props.sidebarClosingClick}>console</Link></li>
          <li><Link to='/art/fluid' onClick={this.props.sidebarClosingClick}>fluid</Link></li>
          <li><Link to='/art/spirograph' onClick={this.props.sidebarClosingClick}>spirograph</Link></li>
        </ul>
      </div>
    );
  }
}

export default SideDrawerExperimentsPage;