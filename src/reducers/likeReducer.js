import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    Liked: [],
    nbLike: [],
    // Liked: [false, false, false, false, false, false],
    // nbLike: [10, 1, 2, 3, 4, 5],
    allLike: []
}

export const FETCH_LIKE = "FETCH_LIKE"
export const LIKE = "LIKE"



const likeReducer = (state = initState, action) => {
    let likedArray = state.Liked
    let nbLikeArray = state.nbLike
    let allLikeArray = state.allLike
    switch (action.type) {

        case FETCH_LIKE:
            allLikeArray = [...action.likes]
            let nbQuote = action.nbQuote

            for (let x = 0; x < nbQuote; x++) {
                likedArray.push(false)
                nbLikeArray.push(0)
            }

            for (let x = 0; x < allLikeArray.length; x++) {
                let idQuote = allLikeArray[x]['Poste']
                let value = nbLikeArray[idQuote] +1
                nbLikeArray[idQuote] = value
                
                if (action.uid !== null && String(allLikeArray[x]['UID']) === action.uid) {
                    likedArray[idQuote] = true
                }
            }

            console.log(allLikeArray);
            console.log(likedArray);
            console.log(nbLikeArray);
            

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

                for (let x = 0; x < allLikeArray.length; x++) {
                    let Poste = allLikeArray[x]['Poste']
                    let uid = allLikeArray[x]['UID']
                    if (Poste === action.id && uid === String(action.uid)) {
                        allLikeArray.splice(x, 1)
                        base.post('/Like', {
                            data: allLikeArray
                        })
                    }
                }
            } else {
                nbLikeArray[action.id]++
                likedArray[action.id] = true
                console.log(allLikeArray)                
                allLikeArray = [...allLikeArray, ...newLike]
                base.post('/Like', {
                    data: allLikeArray
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