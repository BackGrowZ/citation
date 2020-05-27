import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    allCommentary: [],
    organisedCommentary: []
}

export const FETCH_COMMENTARY = "FETCH_COMMENTARY"
export const COMMENTARY = "COMMENTARY"
export const AJOUT_COM = "AJOUT_COM"
export const DELETE_COM = "DELETE_COM"



const commentaireReducer = (state = initState, action) => {
    let allCommentaryArray = state.allCommentary
    let organisedCommentaryArray = state.organisedCommentary
    let keys = []

    // console.log(action)
    switch (action.type) {

        case FETCH_COMMENTARY:
            let nbQuote = action.nbQuote
            allCommentaryArray = action.commentary

            for (let x = 0; x < nbQuote; x++) {
                organisedCommentaryArray.push([])
            }


            keys = Object.keys(allCommentaryArray)
            for (let x = 0; x < keys.length; x++) {
                let idQuote = allCommentaryArray[keys[x]]['Poste']
                organisedCommentaryArray[idQuote].push(allCommentaryArray[keys[x]])
            }

            return {
                ...state,
                allCommentary: allCommentaryArray,
                organisedCommentary: organisedCommentaryArray
            }
        case AJOUT_COM:
            organisedCommentaryArray.push([])
            return {
                ...state,
                organisedCommentary: organisedCommentaryArray
            }
        case DELETE_COM:
            // info necessaire:
            // commentary.Poste === Poste
            // commentary.id === id commentaire

            delete allCommentaryArray[action.id]
            base.remove('/Commentary/' + action.id)

            let filter = organisedCommentaryArray[action.poste]

            for (let x = 0; x < filter.length; x++) {
            console.log('good2');
                if (filter[x].id === action.id) {
                    filter.splice(x, 1)
                    organisedCommentaryArray[action.poste] = filter
                }
            }
            return {
                ...state,
                organisedCommentary: organisedCommentaryArray,
                allCommentary: allCommentaryArray
            }
        case COMMENTARY:
            let idCommentary = uuidv4()
            let newCommentary = [{
                id: idCommentary,
                Poste: action.Poste,
                UID: action.uid,
                fullname: action.fullname,
                commentaire: action.commentaire
            }]
            organisedCommentaryArray[action.Poste] = [...organisedCommentaryArray[action.Poste], ...newCommentary]

            base.post('/Commentary/' + idCommentary, {
                data: newCommentary[0]
            })

            return {
                ...state,
                allCommentary: allCommentaryArray,
                organisedCommentary: organisedCommentaryArray,
            }
        default:
            return state
    }
}

export default commentaireReducer