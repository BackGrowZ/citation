import React, { Component, Fragment } from 'react'
import base from '../keys'
import { connect } from 'react-redux'
import { COMMENTARY, FETCH_COMMENTARY } from '../reducers/commentaireReducer'

class Commentaire extends Component {
    render() {
        let { idQuote } = this.props
        let { commentary } = this.props
        let { uid } = this.props
        const allCommentary = commentary[idQuote] ?
            commentary[idQuote].map(commentary =>
                <div className='col' key={commentary.id} style={{ maxWidth: '20%' }}>
                    <div className="card" style={{ margin: '20px 0', "width": "18rem" }}>
                        <div className="card-header text-center">{commentary.fullname}</div>
                        <div className="card-body">
                            <p className="card-text">{commentary.commentaire}</p>
                        </div>
                    </div>
                </div>
            )
            : null
        const creatCommentary = uid  ?       
            <div className='col' key={commentary.id} style={{ maxWidth: '20%' }}>
                <div className="card" style={{ margin: '20px 0', "width": "18rem" }}>
                    <div className="card-header text-center" >Un commentaire ?</div>
                    <div className="card-body texte-center">
                        <textarea
                            className='form-control'
                            rows='2'
                            style={{
                                marginLeft: '-10px',
                                width: '16.5rem'
                            }}
                        />
                        <button className='btn btn-success mt-3' type='submit' style={{ width: '100%' }}>
                            Validé
                         </button>
                    </div>
                </div>
            </div>
            : null
        return (
            <div className='container' style={{ maxWidth: '1600px' }}>
                <div className='row'>
                    {creatCommentary}
                    {allCommentary}
                </div>
            </div>
        )
    }
}


const mapStatetoProps = state => {
    return {
        nbQuote: state.citation.AllQuote.length,
        idQuote: state.citation.ActiveQuote,
        uid: state.login.uid,
        commentary: state.commentaire.organisedCommentary
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        // like: (id, uid) => {
        //     dispatch({ type: LIKE, id: id, uid: uid })
        // },
        // fetchLike: (like, nbQuote, uid) => {
        //     dispatch({ type: FETCH_LIKE, likes: like, nbQuote: nbQuote, uid: uid })
        // }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Commentaire)