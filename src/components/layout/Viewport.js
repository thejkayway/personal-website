import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutMe from '../pages/about/AboutMe';
import AsciiFace from '../pages/home/AsciiFace';
import ArtLander from '../art/ArtLander';
import PhotoGallery from '../pages/photos/PhotoGallery';
import MusicLander from '../pages/music/MusicLander';

import './Viewport.css';

class Viewport extends Component {
  render() {
    return (
      <div className='viewport'>
        <Switch>
          <Route exact path='/' component={AsciiFace}/>
          <Route path='/about' component={AboutMe}/>
          <Route path='/art' component={ArtLander}/>
          <Route path='/music' component={MusicLander}/>
          <Route path='/photos' component={PhotoGallery}/>
        </Switch>
      </div>
    );
  }
}

export default Viewport;