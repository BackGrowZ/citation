let Localuid = localStorage.getItem('uid')

const initState = (Localuid === undefined) ?
    ({ uid: null })
    :
    ({ uid: Localuid })

export const LOGIN = "LOGIN"



const loginReducer = (state = initState, action) => {
    switch (action.type) {

        case LOGIN:
            let logged = state.uid

            if (!logged) {
                logged = action.uid
            } else {
                logged = null
            }

            return {
                ...state,
                uid: logged
            }
        default:
            return state
    }
}

export default loginReducer