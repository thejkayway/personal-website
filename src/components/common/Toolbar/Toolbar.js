import React from 'react';
import { Link } from 'react-router-dom';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css';
import ToolbarDropdown from '../ToolbarDropdown/ToolbarDropdown';



const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo"><Link to='/'>home</Link></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
              <li className='toolbar_navigation-items_dropdown'>
                <div className='toolbar_navigation-items_dropdown_button'>
                  experiments<span>▼</span>
                </div>
                <div className='toolbar_navigation-items_dropdown_content'>
                  <ToolbarDropdown
                    links={[
                      <Link to='/art/console'>console</Link>,
                      <Link to='/art/fluid'>fluid</Link>,
                      <Link to='/art/spirograph'>spirograph</Link>
                    ]}
                  />
                </div>
              </li>
              <li className='toolbar_navigation-items_dropdown'>
                <div className='toolbar_navigation-items_dropdown_button'>
                  movies<span>▼</span>
                </div>
                <div className='toolbar_navigation-items_dropdown_content'>
                  <ToolbarDropdown
                    links={[
                      <a href='https://requests.jonathankay.solutions'>request</a>,
                      <a href='https://plex.tv/web'>watch</a>
                    ]}
                  />
                </div>
              </li>
              <li className='toolbar_navigation-items_links'><Link to='/music'>music</Link></li>
              <li className='toolbar_navigation-items_links'><Link to='/photos'>photography</Link></li>
              <li className='toolbar_navigation-items_links'><Link to='/about'>who?</Link></li>
            </ul>
        </div>
    </nav>
  </header>
);

export default toolbar;