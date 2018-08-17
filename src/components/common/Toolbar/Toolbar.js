import React from 'react';
import { Link } from 'react-router-dom';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css';



const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo"><Link to='/'>who?</Link></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
              <li className='toolbar_navigation-items_dropdown'>experiments<span>▼</span></li>
              <li className='toolbar_navigation-items_dropdown'>movies<span>▼</span></li>
              <li><Link to='/music'>music</Link></li>
              <li><Link to='/photos'>photography</Link></li>
            </ul>
        </div>
    </nav>
  </header>
);

export default toolbar;