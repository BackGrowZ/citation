import citationReducer from './citationReducer'
import likeReducer from './likeReducer'
import loginReducer from './loginReducer'
import commentaireReducer from './commentaireReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    citation: citationReducer,
    like: likeReducer,
    login: loginReducer,
    commentaire: commentaireReducer,
});

export default rootReducer