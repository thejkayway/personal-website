import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SideDrawer.css';

class SideDrawer extends Component {
  state = {
    experimentsOpen: false,
    moviesOpen: false
  };
  
  dropDownClickHandler = (e) => {
    if (e.target.classList.contains('movies-dropdown')){
      this.setState((prevState) => {
        return {moviesOpen: !prevState.moviesOpen};
      });
    }
    if (e.target.classList.contains('experiments-dropdown')){
      this.setState((prevState) => {
        return {experimentsOpen: !prevState.experimentsOpen};
      });
    }
  };

  render() {
    let drawerClasses = 'side-drawer';
    let dropdownClass = 'side-drawer_navigation-items_dropdown';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <nav className={drawerClasses}>
        <ul>
          <li>
            <div className={dropdownClass + ' experiments-dropdown'} onClick={(e) => this.dropDownClickHandler(e)}>
              experiments
              <span className='arrow'>
              ⇒
              </span>
            </div>
          </li>
          <li>
            <div className={dropdownClass + ' movies-dropdown'} onClick={(e) => this.dropDownClickHandler(e)}>
              movies
              <span className='arrow'>
              ⇒
              </span>
            </div>
          </li>
          <li>
            <Link to='/music' onClick={this.props.click}>music</Link>
          </li>
          <li>
            <Link to='/photos' onClick={this.props.click}>photography</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default SideDrawer;