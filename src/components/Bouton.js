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
            case 'test':
                return console.log('test OK')
            default:
                return null
        }
    }
    couleur = (value) => {
        switch (value) {
            case 'bleu':
                return 'btn btn-primary'
            case 'gris':
                return 'btn btn-secondary'
            case 'vert':
                return 'btn btn-success'
            case 'rouge':
                return 'btn btn-danger'
            case 'orange':
                return 'btn btn-warning'
            case 'bleu2':
                return 'btn btn-info'
            case 'blanc':
                return 'btn btn-light'
            case 'noir':
                return 'btn btn-dark'
            case 'lien':
                return 'btn btn-link'
            default:
                return 'btn btn-primary'
        }
    }
    render() {
        // let Couleur = this.props.Couleur ? this.couleur(this.props.Couleur) : 'btn btn-primary'
        // let Class = this.props.Class ? this.props.Class : null
        // let Style = this.props.Style ? this.props.Style : null
        // let Texte = this.props.Texte ? this.props.Texte : 'Validé'
        // let Clic = this.props.Clic ? () => this.handleClick(this.props.Clic) : null
        // const structure =
        //     <Fragment>
        //         <button
        //             className={Class,Couleur}
        //             style={Style}
        //             onClick={Clic}
        //         >
        //             {Texte}
        //         </button>
        //     </Fragment>

        let max = Object.keys(this.props.allQuote).length -1

        const boutton = this.props.button === PREC_QUOTE ?
            (
                this.props.num > 0 ?
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
                this.props.num !== max ?
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
            boutton
            // <Fragment>{structure}</Fragment>
        )
    }
}

// Recuperer les données
const mapStatetoProps = state => {
    return {
        num: state.citation.Num,
        allQuote : state.citation.AllQuote
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