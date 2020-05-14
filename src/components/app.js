import React, { Component, Fragment } from 'react';
import ShowCitation from '../container/ShowCitation';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddCitation from './AddCitation';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ShowCitation />
        <AddCitation/>
      </Fragment>
    );
  }
}
