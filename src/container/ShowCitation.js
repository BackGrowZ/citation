import React, { Component } from 'react'
import Like from '../components/Like'
import { connect } from 'react-redux'
import { NEXT_QUOTE, PREC_QUOTE } from '../reducers/citationReducer'
import Bouton from '../components/Bouton'

class ShowCitation extends Component {
    render() {
        const { quote } = this.props
        const maxID = quote.length - 1
        const { id } = this.props

        const show = this.props.quote.length ?
            (
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            <p className='display-2 text-left quote'>“</p>
                            <h2 className='text-center'>{quote[id].citation} </h2>
                            <p className='display-2 text-right quote'>”</p>
                        </div>
                        <div className="col">
                            <p><Like id={id} /></p>
                        </div>
                        <div className="col">
                            <h4 className='text-right'><i>{quote[id].auteur}</i></h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Pas de citation</h2>
            )
        return (
            <div className="container">
                <div className="row">
                    <Bouton id={id} button={PREC_QUOTE} />
                    <div className="col-10">
                        <div className='jumbotron'>{show}</div>
                    </div>
                    <Bouton id={id} max={maxID} button={NEXT_QUOTE} />
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

    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(ShowCitation)