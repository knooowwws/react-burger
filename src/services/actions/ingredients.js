import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_VIEWED_INGREDIENT,
} from './actions-ingredients-type';
import fetchIngredients from "../../utils/fetchIngredients";

export function getViewedIngredient(card) {
  return function (dispatch) {
    dispatch({
      type: GET_VIEWED_INGREDIENT,
      item: card,
    });
  };
}

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    fetchIngredients()
      .then((res) => {
        if (res && res.success) {
          !localStorage.ingredients &&
          localStorage.setItem('ingredients', JSON.stringify(res.data));
          dispatch({
            type: GET_DATA_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_DATA_ERROR,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_DATA_ERROR,
        })
      );
  };
}
