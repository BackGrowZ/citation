import React, { Component, Fragment } from 'react';
import ShowCitation from './container/ShowCitation';
import 'bootstrap/dist/css/bootstrap.min.css'
import Fetcher from './components/Fetcher';
import Login from './components/Login';
import Commentaire from './components/Commentaire';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Fetcher/>
        <ShowCitation />
        <Login />
        <Commentaire />
      </Fragment>
    );
  }
}
