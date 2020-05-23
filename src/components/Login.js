import React, { Component, Fragment } from 'react'
import { LOGIN } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../keys'
import { Modal, Button } from 'react-bootstrap'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modalTitle: 'Register',
            fullnameInput: true,
            fullname: '',
            email: '',
            password: '',
            error: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.login_btn = this.login_btn.bind(this)  // login
        this.authenticate = this.authenticate.bind(this) // register
        this.handleAuth = this.handleAuth.bind(this) // set Login
        this.handleModal = this.handleModal.bind(this) // Dispatcher modal
    }

    handleModal = (value) => {
        if (value === 'Register') {
            this.authenticate()
        } else if (value === 'Login') {
            this.login_btn()
        } else if (value === 'logout') {
            this.logout()
        }
    }

    handleShow = (value) => {
        if (value === 'register') {
            this.setState({
                modalTitle: 'Register',
                fullnameInput: true,
                show: true,
            })

        } else if (value === 'login') {
            this.setState({
                modalTitle: 'Login',
                fullnameInput: false,
                show: true,
            })
        }

        if (this.state.show) {
            this.setState({ show: false })
        } else {
            this.setState({ show: true })
        }
    }

    handleAuth = async authData => {
        let uid = authData.user.uid
        let fullname = this.state.fullname
        let email = authData.user.email
        const user = await base.fetch(`User/${uid}`, {
            context: this
        })

        if (!user.uid) {
            base.post(`User/${uid}`, {
                data: { 'uid': uid, 'FullName': fullname, 'email': email }
            })
        }
        localStorage.setItem('uid', uid)
        localStorage.setItem('FullName', fullname)
        this.props.login(uid, fullname)
        this.setState({
            show: false,
            modalTitle: 'Register',
            fullnameInput: true,
            fullname: '',
            email: '',
            password: '',
            error: '',
        })
    }

    login_btn = () => {
        let email = this.state.email
        let password = this.state.password
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(this.handleAuth)
            .catch(err => {
                console.log('err.message: ', err.message);

            })
    }

    authenticate = () => {
        let email = this.state.email
        let password = this.state.password
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(this.handleAuth)
            .catch(err =>
                this.setState({ error: err.message })
            )
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });

    }

    logout = async () => {
        await firebase.auth().signOut().then(this.props.login())
        await localStorage.removeItem('uid')
        await localStorage.removeItem('FullName')
    }

    render() {

        let { logged } = this.props


        const modalButton = logged
            ?
            <Button variant="primary" onClick={() => this.handleModal('logout')}>Logout</Button>
            :
            <Fragment>
                <Button style={{marginRight:'15px'}} variant="primary" onClick={() => this.handleShow('register')}>Register</Button>
                <Button variant="primary" onClick={() => this.handleShow('login')}>Login</Button>
            </Fragment>

        const fullnameInput = this.state.fullnameInput ? <input className='form-control' placeholder='pseudo' value={this.state.fullname} id='fullname' onChange={this.handleInputChange}></input> : null

        const errorModal = this.state.error ? this.state.error : null

        const modalRegister =
            <Fragment>
                <div className='login-btn'>
                    {modalButton}
                </div>

                <Modal show={this.state.show} onHide={() => this.handleShow()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {fullnameInput}
                        <input className='form-control' placeholder='email' value={this.state.email} id='email' onChange={this.handleInputChange}></input>
                        <input className='form-control' placeholder='password' value={this.state.password} id='password' onChange={this.handleInputChange}></input>
                        <p className='mt-2' style={{ color: 'red' }}>{errorModal}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.handleModal()}>
                            Annuler
            </Button>
                        <Button variant="success" onClick={() => this.handleModal(this.state.modalTitle)}>
                            {this.state.modalTitle}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>

        return (

            <Fragment>
                {modalRegister}
            </Fragment>
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