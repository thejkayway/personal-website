import React, { Component } from 'react';

import './SideDrawerMoviesPage.css';

class SideDrawerMoviesPage extends Component {
  render() {
    let pageClasses = 'side-drawer_movies-page';
    if (!this.props.show) {
      pageClasses = 'side-drawer_movies-page hide';
    }
    return (
      <div className={pageClasses}>
        <ul>
          <li className='side-drawer_back-button back' onClick={this.props.navClick}>⇐</li>
          <li><a href='https://requests.jonathankay.solutions'>request</a></li>
          <li><a href='https://plex.tv/web'>watch</a></li>
        </ul>
      </div>
    );
  }
}

export default SideDrawerMoviesPage;