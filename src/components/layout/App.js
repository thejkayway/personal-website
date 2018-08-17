import React, { Component } from 'react';
import Toolbar from '../common/Toolbar/Toolbar';
import SideDrawer from '../common/SideDrawer/SideDrawer';
import Backdrop from '../common/Backdrop/Backdrop';
import Viewport from './Viewport';
import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  sideDrawerLinkClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <div className="App">
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer click={this.sideDrawerLinkClickHandler} show={this.state.sideDrawerOpen} />
        {backdrop}
        <Viewport />
      </div>
    );
  }
}

export default App;