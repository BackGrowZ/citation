let Localuid = localStorage.getItem('uid')
let LocalFullName = localStorage.getItem('FullName')

const initState = (Localuid === undefined && LocalFullName === undefined) ?
    ({ uid: null, FullName: null })
    :
    ({ uid: Localuid, fullname: LocalFullName })

export const LOGIN = "LOGIN"



const loginReducer = (state = initState, action) => {
    switch (action.type) {

        case LOGIN:
            let logged = state.uid
            let name = state.fullname

            if (!logged) {
                logged = action.uid
                name = action.fullname
            } else {
                logged = null
                name = null
            }

            return {
                ...state,
                uid: logged,
                fullname: name
            }
        default:
            return state
    }
}

export default loginReducer