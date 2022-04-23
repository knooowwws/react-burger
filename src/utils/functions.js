import {getResponse} from "./fetchIngredients";

const url = 'https://norma.nomoreparties.space/api'

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};


//FUNCTIONS
export const login = async ({ email, password }) => {
    await fetch(`${url}/auth/login`, {
        headers,
        method: 'POST',
        body: JSON.stringify({email, password}),
    }).then(r => getResponse(r))
}

export const register = async ({email, password, name}) => {
    await fetch(`${url}/auth/register`, {
        headers,
        method: 'POST',
        body: JSON.stringify({email, password, name}),
    }).then(r => getResponse(r))
}

export const logOut = async () => {
     await fetch(`${url}/auth/logout`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ token: localStorage.refreshToken }),
    }).then(r => getResponse(r))
};

export const getCodeChangePassword = async ({ email }) => {
    await fetch(`${url}/password-reset`, {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email }),
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
    setCookie(name, null, { expires: -1 });
}

export const getTokens = (res) => {
    const accessToken = res.accessToken.split('Bearer ')[1];
    const refreshToken = res.refreshToken;
    setCookie('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const signOut = () => {
    localStorage.removeItem('refreshToken');
    deleteCookie('token');
};