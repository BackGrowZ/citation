import React, { Component, Fragment } from 'react'
import Like from '../components/Like'
import { connect } from 'react-redux'
import { NEXT_QUOTE, PREC_QUOTE } from '../reducers/citationReducer'
import Bouton from '../components/Bouton'
import AddCitation from '../components/AddCitation'

class ShowCitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        if (this.state.add) {
            this.setState({ add: false })
        } else {
            this.setState({ add: true })
        }
    }
    render() {
        const { quote } = this.props
        let idQuote = Object.keys(quote)
        const { uid } = this.props
        const { id } = this.props

            console.log(quote);
            console.log(id);
            
        const btn = this.state.add ? <button className='btn btn-danger addCitation-btn' onClick={this.handleClick}>Annuler</button> : <button className='btn btn-success addCitation-btn' onClick={this.handleClick}>Ajouter une citation</button>
        
        const add = uid ?
            btn
            : null

        const show = idQuote.length ?
            (
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            <p className='display-2 text-left quote'>“</p>
                            <h2 className='text-center interligne'>{quote[id].citation} </h2>
                            <p className='display-2 text-right quote'>”</p>
                        </div>
                        <div className="col" style={{ marginTop: '8px' }}>
                            <p><Like /></p>
                        </div>
                        <div className="col" style={{ marginTop: '6px' }}>
                            <h4 className='text-right'><i>{quote[id].auteur}</i></h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Pas de citation</h2>
            )


        const affichage = (!this.state.add) ?
            <div className="container">
                <div className="row">
                    <Bouton button={PREC_QUOTE} />
                    <div className="col-10">
                        <div className='jumbotron paper'>{show}</div>
                    </div>
                    <Bouton button={NEXT_QUOTE} />
                </div>
            </div>
            :
            <div className="container">
                <div className="row">
                    {/* <Bouton id={id} button={PREC_QUOTE} /> */}
                    <div className="col-10">
                        <div className='jumbotron paper'><AddCitation end={this.handleClick} /> </div>
                    </div>
                    {/* <Bouton id={id} max={maxID} button={NEXT_QUOTE} /> */}
                </div>
            </div>

        return (<Fragment>{add}{affichage}</Fragment>)
    }
}

// Recuperer les données
const mapStatetoProps = state => {
    return {
        quote: state.citation.AllQuote,
        id: state.citation.ActiveQuote,
        uid: state.login.uid
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(ShowCitation)