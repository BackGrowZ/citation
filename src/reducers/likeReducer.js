const initState = {
    Liked: [true, false, false, false, true, true, false],
    nbLike: [10, 1, 2, 3, 4, 5, 6]
}

export const FETCH_LIKE = "FETCH_LIKE"
export const LIKE = "LIKE"



const likeReducer = (state = initState, action) => {
    switch (action.type) {
        
        case LIKE:
            
            let likedArray = initState.Liked
            let nbLikeArray = initState.nbLike
            
            if (likedArray[action.id]) {     
                nbLikeArray[action.id]--
                likedArray[action.id] = false
            } else {      
                nbLikeArray[action.id]++
                likedArray[action.id] = true
            }

            return {
                ...state,
                Liked: likedArray,
                nbLike: nbLikeArray
            }
        // case FETCH_LIKE:
        //     let allQuote = [...action.citations]
        //     let fechQuote = [...allQuote]
        //     return {
        //         ...state,
        //         AllQuote: fechQuote
        //     }
        default:
            return state
    }
}

export default likeReducer