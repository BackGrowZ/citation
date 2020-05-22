import React, { Component } from 'react'
import base from '../keys'
import { connect } from 'react-redux'
import { COMMENTARY, FETCH_COMMENTARY } from '../reducers/commentaireReducer'

class Commentaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentaireAdd: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fetchAllCommentary = this.fetchAllCommentary.bind(this)
    }
    componentDidMount() {
        setTimeout(() => { this.forceUpdate(); }, 1000);
    }
    fetchAllCommentary = async (nbQuote) => {
        const commentary = await base.fetch('/Commentary', {
            context: this,
        })
        await this.props.fetchCommentary(commentary, nbQuote)
    }
    handleClick(e) {
        e.preventDefault();
        if (this.state.commentaireAdd !== '') {
            this.setState({ commentaireAdd: '' })
            this.props.addCommentary(this.props.num, this.props.uid, this.props.fullname, this.state.commentaireAdd)
        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    check() {
        if (this.props.commentary === []) {
            setTimeout(() => { this.check() }, 1000)
        } else {
            setTimeout(() => { this.forceUpdate() }, 1000)
        }
    }
    render() {
        let { num } = this.props
        let { commentary } = this.props
        let { uid } = this.props
      
        const allCommentary = commentary[num] ?
            commentary[num].map(commentary =>
                <div className='col' key={commentary.id}>
                    <div className="card postit" style={{ margin: '20px 0', "width": "18rem" }}>
                        <div className="card-header text-center">{commentary.fullname}</div>
                        <div className="card-body">
                            <p className="card-text">{commentary.commentaire}</p>
                        </div>
                    </div>
                </div>
            )
            : this.check()

        const creatCommentary = uid ?
            <div className='col' key={commentary.id}>
                <div className="card postit" style={{ margin: '20px 0', "width": "18rem" }}>
                    <div className="card-header text-center" >Ajouter un commentaire</div>
                    <div className="card-body texte-center">
                        <textarea
                            value={this.state.commentaireAdd}
                            id='commentaireAdd'
                            onChange={this.handleInputChange}
                            className='textarea'
                            rows='2'
                            style={{
                                marginLeft: '-10px',
                                width: '16.5rem'
                            }}
                        />
                        <button
                            className='btn btn-success mt-3'
                            type='submit'
                            onClick={this.handleClick}
                            style={{ width: '100%' }}>
                            Validé
                         </button>
                    </div>
                </div>
            </div>
            : null

        return (
            <div className='container'>
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
        num: state.citation.Num,
        idQuote: state.citation.ActiveQuote,
        uid: state.login.uid,
        fullname: state.login.fullname,
        commentary: state.commentaire.organisedCommentary
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        addCommentary: (num, uid, fullname, commentary) => {
            dispatch({ type: COMMENTARY, Poste: num, uid: uid, fullname: fullname, commentaire: commentary })
        },
        fetchCommentary: (commentary, nbQuote) => {
            dispatch({ type: FETCH_COMMENTARY, commentary: commentary, nbQuote: nbQuote })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Commentaire)