
export const authReducer = (state, action) => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signUp': 
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated',
                token: action.payload.token,
                rol: action.payload.rol,
                id: action.payload.id,
                errorMessage: ''
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null
            }
        default:
            return state;
    }
}