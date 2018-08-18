import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import './SideDrawerMainPage.css';

class SideDrawerMainPage extends Component {
  state = {
    experimentsOpen: false,
    moviesOpen: false
  };

  render() {
    let dropdownClass = 'side-drawer_navigation-items_dropdown';
    let pageClasses = 'side-drawer_main-page';
    if (!this.props.show) {
      pageClasses = 'side-drawer_main-page hide';
    }

    return (
      <div className={pageClasses}>
        <ul>
          <li>
            <div className={dropdownClass + ' experiments-dropdown'} onClick={this.props.navClick}>
              experiments
              <span className='arrow'>
              ⇒
              </span>
            </div>
          </li>
          <li>
            <div className={dropdownClass + ' movies-dropdown'} onClick={this.props.navClick}>
              movies
              <span className='arrow'>
              ⇒
              </span>
            </div>
          </li>
          <li>
            <Link to='/music' onClick={this.props.sidebarClosingClick}>music</Link>
          </li>
          <li>
            <Link to='/photos' onClick={this.props.sidebarClosingClick}>photography</Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default SideDrawerMainPage;