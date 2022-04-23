const initState = {
    name: '',
    email: '',

    userRequest: false,
    userFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    tokenRequest: false,
    tokenUpdate: false,
    tokenFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    forgotRequest: false,
    forgotFailed: false,
    isResetPassword: false,
    resetRequest: false,
    resetFailed: false,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST': {
            return { ...state, updateUserRequest: true };
        }
        case 'USER_UPDATE_SUCCESS': {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: false,
                name: action.data.user.name,
                email: action.data.user.email,
            };
        }
        case 'USER_UPDATE_ERROR': {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            };
        }

        case 'USER_REQUEST': {
            return { ...state, userRequest: true };
        }
        case 'USER_SUCCESS': {
            return {
                ...state,
                userRequest: false,
                userFailed: false,
                name: action.data.user.name,
                email: action.data.user.email,
            };
        }
        case 'USER_ERROR': {
            return {
                ...state,
                userRequest: false,
                userFailed: true,
            };
        }

        case 'TOKEN_REQUEST': {
            return { ...state, tokenRequest: true };
        }
        case 'TOKEN_SUCCESS': {
            return {
                ...state,
                tokenUpdate: true,
                tokenRequest: false,
                tokenFailed: false,
            };
        }
        case 'TOKEN_ERROR': {
            return {
                ...state,
                tokenRequest: false,
                tokenUpdate: false,
                tokenFailed: true,
            };
        }

        case 'LOGOUT_REQUEST': {
            return { ...state, registerRequest: true };
        }
        case 'LOGOUT_SUCCESS': {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                name: '',
                email: '',
            };
        }
        case 'LOGOUT_ERROR': {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            };
        }

        case 'REGISTER_REQUEST': {
            return { ...state, registerRequest: true };
        }
        case 'REGISTER_SUCCESS': {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                name: action.data.user.name,
                email: action.data.user.email,
            };
        }
        case 'REGISTER_ERROR': {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
            };
        }

        case 'LOGIN_REQUEST': {
            return { ...state, loginRequest: true };
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                name: action.data.user.name,
                email: action.data.user.email,
            };
        }
        case 'LOGIN_ERROR': {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
            };
        }

        case 'FORGOT_PASSWORD_REQUEST': {
            return { ...state, forgotRequest: true, isResetPassword: false };
        }
        case 'FORGOT_PASSWORD_SUCCESS': {
            return {
                ...state,
                forgotRequest: false,
                isResetPassword: true,
                forgotFailed: false,
            };
        }
        case 'FORGOT_PASSWORD_ERROR': {
            return {
                ...state,
                forgotRequest: false,
                isResetPassword: false,
                forgotFailed: true,
            };
        }

        case 'RESET_PASSWORD_REQUEST': {
            return { ...state, resetRequest: true };
        }
        case 'RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                resetRequest: false,
                resetFailed: false,
            };
        }
        case 'RESET_PASSWORD_ERROR': {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true,
            };
        }
        default:
            return state;
    }
};