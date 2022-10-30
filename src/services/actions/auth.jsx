import {
    getTokens,
    signOut,
    login,
    logOut,
    registration,
    getCodeChangePassword,
    saveNewPassword, getUserInfo, getNewToken, updateUserInfo
} from '../../utils/functions';

export const logout = (goLogin) => {
    return function (dispatch) {
        dispatch({ type: 'LOGOUT_REQUEST' });
        logOut()
            .then((res) => {

                    console.log('exit success')
                    signOut();
                    dispatch({ type: 'LOGOUT_SUCCESS' });
                    goLogin()
                    console.log('выход удался')
                    // dispatch({ type: 'LOGOUT_ERROR' });

            })
            .catch((err) => {
                console.log('выход не удался2')
                console.log(err, err.message);
                dispatch({ type: 'LOGOUT_ERROR' });
            });
    };
};

export const getNewAccessToken = () => {
    return function (dispatch) {
        dispatch({ type: 'TOKEN_REQUEST' });
        getNewToken()
            .then((res) => {
                console.log('новый аксес токен получен')
                getTokens(res);
                if (res && res.success) {
                    dispatch({ type: 'TOKEN_SUCCESS' });
                    getUserProfile()
                } else {
                    dispatch({ type: 'TOKEN_ERROR' });
                }
            })
            .catch((err) => {
                if (err.message === 'Token is invalid') {
                    dispatch(getNewAccessToken());
                } else console.log(err, err.message);
                dispatch({ type: 'TOKEN_ERROR' });
            });
    };
};

export const updateUserProfile = ({ name, email, password }) => {
    return function (dispatch) {
        dispatch({ type: 'USER_UPDATE_REQUEST' });
        updateUserInfo({ name, email, password })
            .then((res) => dispatch({ type: 'USER_UPDATE_SUCCESS', data: res }))
            .catch((err) => {
                if (
                    err.message === 'jwt expired' ||
                    err.message === 'Token is invalid'
                ) {
                    dispatch(getNewAccessToken());
                    dispatch(updateUserProfile({ name, email, password }));
                }

                dispatch({ type: 'USER_UPDATE_ERROR' });
            });
    };
};

// user
export const getUserProfile = () => {
    return function (dispatch) {
        dispatch({ type: 'USER_REQUEST' });

        getUserInfo()
            .then((res) => {
                if (res && res.success) {
                    dispatch({ type: 'USER_SUCCESS', data: res });
                } else {
                    dispatch({ type: 'USER_ERROR' });
                }
            })
            .catch((err) => {
                if (
                    err.message === 'jwt expired' ||
                    err.message === 'Token is invalid'
                ) {
                    dispatch(getNewAccessToken());
                    dispatch(getUserProfile());
                } else console.log(err.message);
                dispatch({ type: 'USER_ERROR' });
            });
    };
};

export const registerAction = ({name, email, password}) => {
    return function (dispatch) {
        dispatch({ type: 'REGISTER_REQUEST' });
        registration({name, email, password})
            .then((res) => {
                getTokens(res);
                if (res && res.success) {
                    dispatch({ type: 'REGISTER_SUCCESS', data: res });
                } else {
                    dispatch({ type: 'REGISTER_ERROR' });
                }
            })
            .catch((err) => {
                console.log(err, err.message);
                dispatch({ type: 'REGISTER_ERROR' });
            });
    };
};
// };

export const authorize = ({email, password}) => {
    return function (dispatch) {
        dispatch({ type: 'LOGIN_REQUEST' });
        login(email, password)
            .then(r => getTokens(r))
            // .then(r => console.log(typeof r))
            // .then((res) => {
            //     getTokens(res);
            //     if (res && res.success) {
            //         dispatch({ type: 'LOGIN_SUCCESS', data: res });
            //     } else {
            //         dispatch({ type: 'LOGIN_ERROR' });
            //     }
            // })
            .catch((err) => {
                console.log(err, err.message);
                dispatch({ type: 'LOGIN_ERROR' });
            });
    };
};

export const forgotPassword = (email, goResetPassword) => {
    return function (dispatch) {
        dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
        getCodeChangePassword(email)
            .then((res) => {
                if (res && res.success) {
                    dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
                    goResetPassword()
                } else {
                    dispatch({ type: 'FORGOT_PASSWORD_ERROR' });
                }
            })
            .catch((err) => {
                console.log(err, err.message);
                dispatch({ type: 'FORGOT_PASSWORD_ERROR' });
            });
    };
};

export const savePassword = (data, goMainPage) => {
    console.log(data, goMainPage)
    return function (dispatch) {
        dispatch({ type: 'RESET_PASSWORD_REQUEST' });
        saveNewPassword(data)
            .then((res) => {
                if (res && res.success) {
                    dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
                    goMainPage()
                } else {
                    dispatch({ type: 'RESET_PASSWORD_ERROR' });
                }
            })
            .catch((err) => {
                console.log(err, err.message);
                dispatch({ type: 'RESET_PASSWORD_ERROR' });
            });
    };
};
