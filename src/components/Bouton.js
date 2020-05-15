import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NEXT_QUOTE, PREC_QUOTE } from '../reducers/citationReducer'

class Bouton extends Component {
    handleClick = (value) => {
        switch (value) {
            case PREC_QUOTE:
                return this.props.precQuote()
            case NEXT_QUOTE:
                return this.props.nextQuote()
            default:
                return null
        }
    }
    render() {
        const boutton = this.props.button === PREC_QUOTE ?
            (
                this.props.id > 0 ?
                    (
                        <Fragment>
                            <button
                                className='btn btn-primary'
                                style={{ height: '50px', position: 'relative', top: '200px' }}
                                onClick={() => this.handleClick(PREC_QUOTE)}
                            >
                                <i className="fas fa-angle-left"></i>
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <button
                                className='btn btn-primary'
                                style={{ height: '50px', position: 'relative', top: '200px', opacity: 0, cursor: 'auto' }}
                            >
                                <i className="fas fa-angle-left"></i>
                            </button>
                        </Fragment>
                    )
            ) : (
                this.props.id !== this.props.max ?
                    (
                        <Fragment>
                            <button
                                className='btn btn-primary'
                                style={{ height: '50px', position: 'relative', top: '200px' }}
                                onClick={() => this.handleClick(NEXT_QUOTE)}
                            >
                                <i className="fas fa-angle-right"></i>
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <button
                                className='btn btn-primary'
                                style={{ height: '50px', position: 'relative', top: '200px', opacity: 0, cursor: 'auto' }}
                            >
                                <i className="fas fa-angle-right"></i>
                            </button>
                        </Fragment>
                    )
            )
        return (
            <Fragment>{boutton}</Fragment>
        )
    }
}

// Recuperer les données
const mapStatetoProps = state => {
    return {
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        precQuote: () => {
            dispatch({ type: PREC_QUOTE })
        },
        nextQuote: () => {
            dispatch({ type: NEXT_QUOTE })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Bouton)