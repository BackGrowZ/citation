const initState = {

    AllQuote: [
        // {
        //     id: 0,
        //     citation: "Tout le monde est un génie. Mais si vous jugez un poisson à sa capacité de grimper à un arbre, il vivra toute sa vie en croyant qu'il est stupide",
        //     auteur: "Albert Einstein"
        // },
        // {
        //     id: 1,
        //     citation: "Dans un environnement qui change, il n'y a pas de plus grand risque que de rester immobile",
        //     auteur: "Jacques Chirac"
        // },
        // {
        //     id: 2,
        //     citation: "Le courage n'est pas l'absence de peur, mais la capacité de vaincre ce qui fait peur",
        //     auteur: "Nelson Mandela"
        // },
        // {
        //     id: 3,
        //     citation: "Mieux vaut mourrir incompris que passer sa vie à s'expliquer",
        //     auteur: "William Shakespeare"
        // },
        // {
        //     id: 4,
        //     citation: "Il n'y a point de pires sourds que ceux qui ne veulent pas entendre",
        //     auteur: "Molière"
        // }
    ],
    ActiveQuote: 0

}

export const FETCH_QUOTE = "FETCH_QUOTE"
export const DELETE_QUOTE = "DELETE_QUOTE"
export const ADD_QUOTE = "ADD_QUOTE"
export const NEXT_QUOTE = "NEXT_QUOTE"
export const PREC_QUOTE = "PREC_QUOTE"

const citationReducer = (state = initState, action) => {
    switch (action.type) {

        case DELETE_QUOTE:
            let removeAllQuote = state.AllQuote.filter(AllQuote => {
                return action.id !== AllQuote.id
            })
            return {
                ...state,
                AllQuote: removeAllQuote
            }
        case ADD_QUOTE:
            let newQuote = [{ id: state.AllQuote.length, citation: action.citation, auteur: action.auteur }]
            let addQuote = [...state.AllQuote, ...newQuote]
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