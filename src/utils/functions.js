import {getResponse} from "./fetchIngredients";

const url = 'https://norma.nomoreparties.space/api'

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};


//FUNCTIONS
export const login = async (email, password) => {
    const res = await fetch(`${url}/auth/login`, {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email, password}),
    })
    if (res.ok) {
        return res.json()
    } else {
        console.log(res.status)
    }
}

export const registration = async ({email, password, name}) => {
    const res = await fetch(`${url}/auth/register`, {
        headers,
        method: 'POST',
        body: JSON.stringify({email, password, name}),
    })
    if (res.ok) {
        return res.json()
    } else {
        return res.json().then((err) => Promise.reject(err))
    }

}

export const logOut = async () => {
    await fetch(`${url}/auth/logout`, {
        headers,
        method: 'POST',
        body: JSON.stringify({'token': localStorage.refreshToken}),
    }).then(r => getResponse(r))
        .catch(r => r.json().then(err => Promise.reject(err)))
};

export const getCodeChangePassword = async ({email}) => {
    await fetch(`${url}/password-reset`, {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({email}),
    }).then(r => getResponse(r))
};

//SSS

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, {expires: -1});
}

export const getTokens = (res) => {
    const accessToken = res.accessToken.split('Bearer ')[1];
    const refreshToken = res.refreshToken;
    setCookie('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const signOut = () => {
    delete localStorage.refreshToken;
    delete document.cookie
    deleteCookie('token');
};

export const saveNewPassword = async ({password, token}) => {
    await fetch(`${url}/password-reset/reset`, {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({password, token}),
    });
};

export const getNewToken = async () => {
    await fetch(`${url}/auth/token`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({'token': localStorage.refreshToken}),
    }).then(r => getResponse(r))
        .catch(res => {
            console.log('новый токен не получен АПИ')
            return res.json().then((err) => Promise.reject(err.message))
        })

};

export const getUserInfo = async () => {
    const cook = getCookie('token')
    await fetch(`${url}/auth/user`, {
        headers: {
            headers,
            Authorization: `Bearer ${cook}`,
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then(r => getResponse(r))
        .catch(res => {
            console.log('no user Info')
            return res.json().then((err) => Promise.reject(err.message))
        })
    debugger

};

export const updateUserInfo = async ({name, email, password}) => {
    await fetch(`${url}/auth/user`, {
        method: 'PATCH',
        headers: {
            ...headers,
            Authorization: `Bearer ${getCookie('token')}`,
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({name, email, password}),
    }).then(r => getResponse(r))
};

export function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

