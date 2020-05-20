import React, { Component, Fragment } from 'react';
import ShowCitation from './container/ShowCitation';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddCitation from './components/AddCitation';
import Login from './components/Login';
import Commentaire from './components/Commentaire';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ShowCitation />
        <Login />
        <AddCitation />
        <Commentaire />
      </Fragment>
    );
  }
}