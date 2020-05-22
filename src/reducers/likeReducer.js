import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    Liked: [],
    nbLike: [],
    allLike: []
}

export const FETCH_LIKE = "FETCH_LIKE"
export const LIKE = "LIKE"
export const AJOUT_LIKE = "AJOUT"



const likeReducer = (state = initState, action) => {
    let likedArray = state.Liked
    let nbLikeArray = state.nbLike
    let allLikeArray = state.allLike
    let keys = action.likes ? Object.keys(action.likes) : Object.keys(state.allLike)
    switch (action.type) {

        case FETCH_LIKE:
            allLikeArray = action.likes
            // keys = Object.keys(allLikeArray)
            let nbQuote = action.nbQuote


            for (let x = 0; x < nbQuote; x++) {
                likedArray.push(false)
                nbLikeArray.push(0)
            }

            for (let x = 0; x < keys.length; x++) {
                let idQuote = allLikeArray[keys[x]]['Poste']
                let value = nbLikeArray[idQuote] + 1
                nbLikeArray[idQuote] = value

                if (action.uid !== null && String(allLikeArray[keys[x]]['UID']) === action.uid) {
                    likedArray[idQuote] = true
                }
            }

            return {
                ...state,
                Liked: likedArray,
                nbLike: nbLikeArray,
                allLike: allLikeArray
            }
        case AJOUT_LIKE:
            likedArray.push(false)
            nbLikeArray.push(0)
            return {
                ...state,
                Liked: likedArray,
                nbLike: nbLikeArray,
                allLike: allLikeArray
            }
        case LIKE:
            let idLike = uuidv4()
            let newLike = [{ id: idLike, Poste: action.id, UID: action.uid }]
            if (likedArray[action.id]) {
                nbLikeArray[action.id]--
                likedArray[action.id] = false

                for (let x = 0; x < keys.length; x++) {
                    let Poste = allLikeArray[keys[x]]['Poste']
                    let uid = allLikeArray[keys[x]]['UID']
                    if (Poste === action.id && uid === String(action.uid)) {
                        // allLikeArray.splice(keys[x], 1)
                        delete allLikeArray[keys[x]]
                        base.remove('/Like/' + keys[x])
                    }
                }
            } else {
                nbLikeArray[action.id]++
                likedArray[action.id] = true

                allLikeArray[idLike] = newLike[0]
                base.post('/Like/' + idLike, {
                    data: newLike[0]
                })
            }

            return {
                ...state,
                Liked: likedArray,
                nbLike: nbLikeArray,
                allLike: allLikeArray
            }
        default:
            return state
    }
}

export default likeReducer