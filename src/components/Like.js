import React, { Component, Fragment } from 'react'
import base from '../keys'
import { connect } from 'react-redux'
import { LIKE, FETCH_LIKE } from '../reducers/likeReducer'

class Like extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        setTimeout(() => { this.forceUpdate(); }, 1000);

    }
    fetchAllLike = async (nbQuote, uid) => {
        const like = await base.fetch('/Like', {
            context: this,
        })
        const verrifLike = (like.length) ? (like) : ([])
        await this.props.fetchLike(verrifLike, nbQuote, uid)
    }
    handleClick() {
        this.props.like(this.props.id, this.props.uid)
        this.forceUpdate()

    }
    render() {
        let { id } = this.props
        let { liked } = this.props
        let { nbLike } = this.props
        let { uid } = this.props

        const notLikedQuote = uid ? // connecter 
            <Fragment>
                <i className="fas fa-heart" style={{ color: "#99A3A4", textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black', fontSize: '20px', cursor: 'pointer' }} onClick={this.handleClick} />
                <span className='ml-2'>{nbLike[id]}</span>
            </Fragment>
            : // pas connecter 
            <Fragment>
                <i className="fas fa-heart" style={{ color: "#99A3A4", textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black', fontSize: '20px' }} />
                <span className='ml-2'>{nbLike[id]}</span>
            </Fragment>

        const likedQuote =
            <Fragment>
                <i className="fas fa-heart" style={{ color: "red", fontSize: '20px', cursor: 'pointer' }} onClick={this.handleClick} />
                <span className='ml-2'>{nbLike[id]}</span>
            </Fragment>
        
        const like =
            uid ? // connecter ?
                liked[id] ? // J'ai liké ?
                    likedQuote // oui j'ai liker
                    :
                    notLikedQuote // non j'ai pas liker
                : notLikedQuote // Je suis pas connecter

        return like
    }
}


const mapStatetoProps = state => {
    return {
        liked: state.like.Liked,
        nbLike: state.like.nbLike,
        nbQuote: state.citation.AllQuote.length,
        id: state.citation.ActiveQuote,
        uid: state.login.uid
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        like: (id, uid) => {
            dispatch({ type: LIKE, id: id, uid: uid })
        },
        fetchLike: (like, nbQuote, uid) => {
            dispatch({ type: FETCH_LIKE, likes: like, nbQuote: nbQuote, uid: uid })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Like)