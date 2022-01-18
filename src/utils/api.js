
const url = 'https://norma.nomoreparties.space/api/ingredients'

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const Api = () => {
    return fetch(url)
        .then(r => {
            return getResponse(r)
        })
}

export default Api;