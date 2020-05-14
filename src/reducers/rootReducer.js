import citationReducer from './citationReducer'
import likeReducer from './likeReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    citation: citationReducer,
    like: likeReducer
});

export default rootReducer