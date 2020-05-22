import { Component } from 'react'
import { connect } from 'react-redux'
import { FETCH_COMMENTARY } from '../reducers/commentaireReducer'
import { FETCH_LIKE } from '../reducers/likeReducer'
import { FETCH_QUOTE } from '../reducers/citationReducer'
import base from '../keys'


class Fetcher extends Component {
    componentDidMount = async () => {
        await this.fetchAllQuote()
        this.otherFetch()
        
    }

    otherFetch () {
        let keyQuote = Object.keys(this.props.AllQuote)
        let nbQuote = keyQuote.length
        if (nbQuote) {            
            this.fetchAllLike(nbQuote, this.props.uid)
            this.fetchAllCommentary(nbQuote)
        } else setTimeout(() => { this.otherFetch(); }, 1000);
    }

    fetchAllQuote = async () => {
        const citation = await base.fetch('/citation/AllQuote', {
            context: this,
        })
        await this.props.fetchQuote(citation)
    }
    fetchAllLike = async (nbQuote, uid) => {
        const like = await base.fetch('/Like', {
            context: this,
        })
        await this.props.fetchLike(like, nbQuote, uid)
    }
    fetchAllCommentary = async (nbQuote) => {
        const commentary = await base.fetch('/Commentary', {
            context: this,
        })
        await this.props.fetchCommentary(commentary, nbQuote)
    }

    render() {
        return null
    }
}


const mapStatetoProps = state => {
    return {
        uid: state.login.uid,
        AllQuote: state.citation.AllQuote,
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        fetchLike: (like, nbQuote, uid) => {
            dispatch({ type: FETCH_LIKE, likes: like, nbQuote: nbQuote, uid: uid })
        },
        fetchQuote: (citation) => {
            dispatch({ type: FETCH_QUOTE, citations: citation })
        },
        fetchCommentary: (commentary, nbQuote) => {
            dispatch({ type: FETCH_COMMENTARY, commentary: commentary, nbQuote: nbQuote })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Fetcher)