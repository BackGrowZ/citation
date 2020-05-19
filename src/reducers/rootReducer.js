import citationReducer from './citationReducer'
import likeReducer from './likeReducer'
import loginReducer from './loginReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    citation: citationReducer,
    like: likeReducer,
    login: loginReducer
});

export default rootReducer