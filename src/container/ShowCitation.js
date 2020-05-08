import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NEXT_QUOTE, PREC_QUOTE } from '../reducers/citationReducer'

class ShowCitation extends Component {
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
        const { quote } = this.props
        const { id } = this.props
        
        const show = this.props.quote.length ? (
            <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <p className='display-2 text-left quote'>“</p>
                        <h2 className='text-center'>{quote[id].citation} </h2>
                        <p className='display-2 text-right quote'>”</p>
                    </div>
                    <div className="col">
                        <p>
                            {/* <i class="fas fa-heart" />  */}
                            &nbsp; {id+1}/{quote.length}
                        </p>
                    </div>
                    <div className="col">
                        <h4 className='text-right'><i>{quote[id].auteur}</i></h4>
                    </div>
                </div>
            </div>) : (
                <h2>Pas de citation</h2>
            )
        return (
            <div className="container">
                <div className="row">
                    <button
                        className='btn btn-primary'
                        style={{ height: '50px', position: 'relative', top: '200px' }}
                        onClick={() => this.handleClick(PREC_QUOTE)}
                    >
                        <i className="fas fa-angle-left"></i>
                    </button>
                    <div className="col-10">
                        <div className='jumbotron'>{show}</div>
                    </div>
                    <button
                        className='btn btn-primary'
                        onClick={() => this.handleClick(NEXT_QUOTE)}
                        style={{ height: '50px', position: 'relative', top: '200px' }}
                    >
                        <i className="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
        )
    }
}

// Recuperer les données
const mapStatetoProps = state => {    
    return {
        quote: state.citation.AllQuote,
        id: state.citation.ActiveQuote
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


export default connect(mapStatetoProps, mapDispatchToProps)(ShowCitation)