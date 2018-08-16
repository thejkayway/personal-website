import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutMe from '../pages/about/AboutMe';
import AsciiFace from '../pages/home/AsciiFace';
import ArtLander from '../art/ArtLander';

class Viewport extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={AsciiFace}/>
        <Route path='/art' component={ArtLander}/>
        <Route path='/about' component={AboutMe}/>
      </Switch>
    );
  }
}

export default Viewport;