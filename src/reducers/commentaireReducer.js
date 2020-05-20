import base from '../keys'
import { v4 as uuidv4 } from 'uuid';


const initState = {
    allCommentary: [
        { id: 0, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 0' },
        { id: 1, Poste: 1, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 1' },
        { id: 2, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 2' },
        { id: 3, Poste: 1, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 3' },
        { id: 4, Poste: 3, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 4' },
        { id: 5, Poste: 3, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 5' },
        { id: 6, Poste: 2, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 6' },
    ],
    organisedCommentary: [
        [
            { id: 0, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: "my commentary 0 it's not realy long but this my first commentary" },
            { id: 10, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: "my commentary 0 testestestse dsdujioqseudzioqd udosuq dioqud_ouf  it's not realy long but this my first commentary" },
            { id: 20, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: "my commentary 0 it's not realy long but this my first commentary" },
            { id: 30, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: "my commentary 0 it's not realy long but this my first commentary" },
            { id: 2, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 2' },
            { id: 23, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 2' },
            { id: 24, Poste: 0, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 2' },
        ],
        [
            { id: 1, Poste: 1, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 1' },
            { id: 3, Poste: 1, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 3' },
        ],
        [
            { id: 6, Poste: 2, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 6' },
        ],
        [
            { id: 4, Poste: 3, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 4' },
            { id: 5, Poste: 3, uid: 163856148648, fullname: 'Anthony Carreta', commentaire: 'my commentary 5' },
        ]
    ]
}

export const FETCH_COMMENTARY = "FETCH_COMMENTARY"
export const COMMENTARY = "COMMENTARY"



const commentaireReducer = (state = initState, action) => {
    let allCommentaryArray = state.allCommentary
    let organisedCommentaryArray = state.organisedCommentary
    switch (action.type) {

        case FETCH_COMMENTARY:
            let nbQuote = action.nbQuote
            allCommentaryArray = [...action.commentary]

            for (let x = 0; x < nbQuote; x++) {
                organisedCommentaryArray.push([])
            }

            for (let x = 0; x < allCommentaryArray.length; x++) {
                let idQuote = allCommentaryArray[x]['Poste']
                organisedCommentaryArray[idQuote].push(allCommentaryArray[x])

                // if (action.uid !== null && String(allLikeArray[x]['UID']) === action.uid) {
                //     likedArray[idQuote] = true
                // }
            }

            return {
                ...state,
                allCommentary: allCommentaryArray,
                organisedCommentary: organisedCommentaryArray
            }
        // case COMMENTARY:
        //     let idLike = uuidv4()
        //     let newLike = [{ id: idLike, Poste: action.id, UID: action.uid }]

        //     if (likedArray[action.id]) {
        //         nbLikeArray[action.id]--
        //         likedArray[action.id] = false

        //         for (let x = 0; x < allLikeArray.length; x++) {
        //             let Poste = allLikeArray[x]['Poste']
        //             let uid = allLikeArray[x]['UID']
        //             if (Poste === action.id && uid === String(action.uid)) {
        //                 allLikeArray.splice(x, 1)
        //                 base.post('/Like', {
        //                     data: allLikeArray
        //                 })
        //             }
        //         }
        //     } else {
        //         nbLikeArray[action.id]++
        //         likedArray[action.id] = true            
        //         allLikeArray = [...allLikeArray, ...newLike]
        //         base.post('/Like', {
        //             data: allLikeArray
        //         })
        //     }

        //     return {
        //         ...state,
        //         Liked: likedArray,
        //         nbLike: nbLikeArray,
        //         allLike: allLikeArray
        //     }
        default:
            return state
    }
}

export default commentaireReducer