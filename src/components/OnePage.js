import React, { Component, Fragment } from 'react';
import ShowCitation from '../container/ShowCitation';
import Fetcher from './Fetcher';
import Login from './Login';
import Commentaire from './Commentaire';

export default class OnePage extends Component {
    render() {
        return (
            <Fragment>
                <Fetcher />
                <ShowCitation />
                <Login />
                <Commentaire />
            </Fragment>
        )
    }
}
