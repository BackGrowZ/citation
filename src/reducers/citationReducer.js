import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    AllQuote: [],
    ActiveQuote: 0,
    Num: 0
}

export const FETCH_QUOTE = "FETCH_QUOTE"
export const ADD_QUOTE = "ADD_QUOTE"
export const NEXT_QUOTE = "NEXT_QUOTE"
export const PREC_QUOTE = "PREC_QUOTE"

const citationReducer = (state = initState, action) => {
            let keys = Object.keys(state.AllQuote)
            let num = state.Num
    switch (action.type) {

        case ADD_QUOTE:
            let id = uuidv4()
            let newQuote = { id: id, citation: action.citation, auteur: action.auteur }
            let addQuote = state.AllQuote 

            addQuote[id] = newQuote 
            // let keys = Object.keys(addQuote)
            base.post('/citation/AllQuote/'+id,{
                data: newQuote
             })
            return {
                ...state,
                AllQuote: addQuote,
                ActiveQuote: id
            }
        case FETCH_QUOTE:
            let allQuote = action.citations
            return {
                ...state,
                AllQuote: allQuote
            }
        case NEXT_QUOTE:
            let nextActiveQuote = state.ActiveQuote
            if (num < keys.length - 1) {
                num++
                nextActiveQuote = keys[num]

            }
            return {
                ...state,
                ActiveQuote: nextActiveQuote,
                Num: num
            }
        case PREC_QUOTE:
            let precActiveQuote = state.ActiveQuote
            if (num > 0) {
                num--
                precActiveQuote = keys[num]
            }
            return {
                ...state,
                Num: num,
                ActiveQuote: precActiveQuote
            }
        default:
            return state
    }
}

export default citationReducer