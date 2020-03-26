const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Incorrect username or password'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR': 
            console.log('signup error');
            return{
                ...state,
                authError: action.err.message
            }
        case 'UPDATE_PROFILE':
            console.log('update success');
        case 'UPDATE_PROFILE_ERROR': 
            console.log('update error');
        default:
            return state;
    }
}

export default authReducer