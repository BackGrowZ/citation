import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    AllQuote: [],
    ActiveQuote: 0
}

export const FETCH_QUOTE = "FETCH_QUOTE"
export const ADD_QUOTE = "ADD_QUOTE"
export const NEXT_QUOTE = "NEXT_QUOTE"
export const PREC_QUOTE = "PREC_QUOTE"

const citationReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_QUOTE:
            let id = uuidv4()
            let newQuote = [{ id: id, citation: action.citation, auteur: action.auteur }]
            let addQuote = [...state.AllQuote, ...newQuote]
            base.post('/citation/AllQuote',{
                data: addQuote
             })
            return {
                ...state,
                AllQuote: addQuote
            }
        case FETCH_QUOTE:
            let allQuote = [...action.citations]
            let fechQuote = [...allQuote]
            return {
                ...state,
                AllQuote: fechQuote
            }
        case NEXT_QUOTE:
            let nextActiveQuote = state.ActiveQuote
            if (nextActiveQuote < state.AllQuote.length - 1) {
                nextActiveQuote++
            }
            return {
                ...state,
                ActiveQuote: nextActiveQuote
            }
        case PREC_QUOTE:
            let precActiveQuote = state.ActiveQuote
            if (precActiveQuote > 0) {
                precActiveQuote--
            }
            return {
                ...state,
                ActiveQuote: precActiveQuote
            }
        default:
            return state
    }
}

export default citationReducer