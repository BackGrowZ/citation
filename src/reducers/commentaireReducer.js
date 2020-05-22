import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    allCommentary: [],
    organisedCommentary: []
}

export const FETCH_COMMENTARY = "FETCH_COMMENTARY"
export const COMMENTARY = "COMMENTARY"
export const AJOUT_COM = "AJOUT_COM"



const commentaireReducer = (state = initState, action) => {
    let allCommentaryArray = state.allCommentary
    let organisedCommentaryArray = state.organisedCommentary
    let keys = Object.keys(allCommentaryArray)

    switch (action.type) {

        case FETCH_COMMENTARY:
            let nbQuote = action.nbQuote
            allCommentaryArray = action.commentary

            for (let x = 0; x < nbQuote; x++) {
                organisedCommentaryArray.push([])
            }


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
                organisedCommentary : organisedCommentaryArray
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

            console.log(action)
            console.log(organisedCommentaryArray)

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