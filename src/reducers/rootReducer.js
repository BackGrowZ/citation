import citationReducer from './citationReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    citation: citationReducer
});

export default rootReducer