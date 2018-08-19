import React, { Component } from 'react';
import SideDrawerMainPage from './SideDrawerPages/SideDrawerMainPage'
import SideDrawerExperimentsPage from './SideDrawerPages/SideDrawerExperimentsPage'
import SideDrawerMoviesPage from './SideDrawerPages/SideDrawerMoviesPage'

import './SideDrawer.css';

class SideDrawer extends Component {
  render() {
    let drawerClasses = 'side-drawer';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <nav className={drawerClasses}>
        <SideDrawerMainPage
          navClick={this.props.navClick}
          sidebarClosingClick={this.props.closingClick}
          show={this.props.currentPage==='main'}/>
        <SideDrawerExperimentsPage
          navClick={this.props.navClick}
          sidebarClosingClick={this.props.closingClick}
          show={this.props.currentPage==='experiments'}/>
        <SideDrawerMoviesPage
          navClick={this.props.navClick}
          sidebarClosingClick={this.props.closingClick}
          show={this.props.currentPage==='movies'}/>
      </nav>
    );
  }
};

export default SideDrawer;