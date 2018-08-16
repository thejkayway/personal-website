import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <ul className='navbar'>
        <li className='navlink'><Link to='/'>home</Link></li>
        <li className='dropdown'>
          <span>experiments ▾</span>
          <div className='dropdown-content'>
            <Link to='/art/console'>console</Link>
            <Link to='/art/fluid'>fluid</Link>
          </div>
        </li>
        <li className='dropdown'>
          <span>movies ▾</span>
          <div className='dropdown-content'>
            <a href='https://plex.tv/web'>watch</a>
            <a href='https://requests.jonathankay.solutions'>request</a>
          </div>
        </li>
        <li className='navlink'><Link to='/music'>music</Link></li>
        <li className='navlink'><Link to='/photos'>photography</Link></li>
        <li className='aboutlink'><Link to='/about'>who?</Link></li>
      </ul>
    );
  }
}

export default Navbar;