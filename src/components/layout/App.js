import React, { Component } from 'react';
import Toolbar from '../common/Toolbar/Toolbar';
import SideDrawer from '../common/SideDrawer/SideDrawer';
import Backdrop from '../common/Backdrop/Backdrop';
import Viewport from './Viewport';
import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false,
    sideDrawerCurrentPage: 'main'
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  sideDrawerClosingClickHandler = () => {
    this.setState({
      sideDrawerOpen: false,
      sideDrawerCurrentPage: 'main'});
  };

  sideDrawerSubMenuClickHandler = (e) => {
    if (e.target.classList.contains('experiments-dropdown')){
      this.setState((prevState) => {
        return {sideDrawerCurrentPage:'experiments'};
      });
    }
    if (e.target.classList.contains('movies-dropdown')){
      this.setState((prevState) => {
        return {sideDrawerCurrentPage:'movies'};
      });
    }
    if (e.target.classList.contains('back')){
      this.setState((prevState) => {
        return {sideDrawerCurrentPage:'main'};
      });
    }
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.sideDrawerClosingClickHandler} />
    }

    return (
      <div className="App">
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer
          closingClick={this.sideDrawerClosingClickHandler}
          navClick={this.sideDrawerSubMenuClickHandler}
          show={this.state.sideDrawerOpen}
          currentPage={this.state.sideDrawerCurrentPage}/>
        {backdrop}
        <Viewport />
      </div>
    );
  }
}

export default App;