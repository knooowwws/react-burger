
export const url = 'https://norma.nomoreparties.space/api/ingredients'
export const postUrl = 'https://norma.nomoreparties.space/api/orders'

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const fetchIngredients = () => {
    return fetch(url)
        .then(r => {
            return getResponse(r)
        })
}

export default fetchIngredients;