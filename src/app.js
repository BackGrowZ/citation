import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import OnePage from './components/OnePage';
import Politique from './components/Politique';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={OnePage} />
          <Route path='/fb' exact component={Politique} />
        </Switch>
      </Router>
    )
  }
}
