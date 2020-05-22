import React, { Component } from 'react'
import { LOGIN } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../keys'

class Login extends Component {

    handleAuth = async authData => {
        let uid = authData.additionalUserInfo.profile.id
        let fullname = authData.additionalUserInfo.profile.name
        let email = authData.additionalUserInfo.profile.email
        const user = await base.fetch(`User/${uid}`, {
            context: this
        })

        if (!user.uid) {
            base.post(`User/${uid}`, {
                data: { 'uid': uid, 'FullName': fullname, 'email': email }
            })
        }
        await localStorage.setItem('uid', uid)
        await localStorage.setItem('FullName', fullname)
        await this.props.login(uid, fullname)
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async () => {
        await firebase.auth().signOut().then(this.props.login())
        await localStorage.removeItem('uid')
        await localStorage.removeItem('FullName')
    }

    render() {
        const { logged } = this.props

        return (
            logged ? (
                <button className='btn btn-primary login-btn' onClick={this.logout}>
                    Me déconnecter
                </button>
            ) : (
                    <div className='container'>
                        {/* <h2>Connecte toi pour profiter de toute les fonctionnalité</h2> */}
                        <button className='btn btn-primary login-btn' onClick={this.authenticate}>
                            Me connecter avec Facebook
                        </button>
                    </div>
                )
        )
    }
}

// Recuperer les données
const mapStatetoProps = state => {
    return {
        logged: state.login.uid
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        login: (uid, fullname) => {
            dispatch({
                type: LOGIN,
                uid: uid,
                fullname: fullname
            })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Login)