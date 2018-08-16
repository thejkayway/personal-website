import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Art from './Art';

class ArtLander extends Component {
  render() {
    return(
      <Switch>
        <Route path='/art/:choice' component={Art}/>
      </Switch>
    );
  }
}

export default ArtLander;