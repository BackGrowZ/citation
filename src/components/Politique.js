import React, { Component } from 'react'

export default class Politique extends Component {
    render() {
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <h1 className='text-center'>Les seul information collecter sont :</h1>
                    <div className='ml-5'>
                        <li>email</li>
                        <li>id Facebook</li>
                        <li>fullname</li>
                    </div>
                </div>
            </div>
        )
    }
}
