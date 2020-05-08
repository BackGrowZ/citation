import React, { Component, Fragment } from 'react';
import ShowCitation from '../container/ShowCitation';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Bouton from './Bouton';
import AddCitation from './AddCitation';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ShowCitation />
        {/* <Bouton /> */}
        <AddCitation/>
      </Fragment>
    );
  }
}
