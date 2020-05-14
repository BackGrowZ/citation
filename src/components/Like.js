import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { LIKE } from '../reducers/likeReducer'

class Like extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        let id = e.target.id
        this.props.like(id)
        this.forceUpdate();
    }
    render() {
        let { liked } = this.props
        let { nbLike } = this.props      
        const like = liked[this.props.id] ?
            (
                <Fragment>
                    <i
                        className="fas fa-heart"
                        style={{ color: "red", fontSize: '20px', cursor: 'pointer' }}
                        onClick={this.handleClick}
                        id={this.props.id}
                    />
                    <span className='ml-2'>{nbLike[this.props.id]}</span>
                </Fragment>
            ) : (
                <Fragment>
                    <i
                        className="fas fa-heart"
                        style={{
                            color: "white",
                            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                            fontSize: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={this.handleClick}
                        id={this.props.id}
                    />
                    <span className='ml-2'>{nbLike[this.props.id]}</span>
                </Fragment>
            )
        return <Fragment>{like}</Fragment>
    }
}


const mapStatetoProps = state => {
    return {
        liked: state.like.Liked,
        nbLike: state.like.nbLike
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        like: (id) => {
            dispatch({ type: LIKE, id: id })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Like)