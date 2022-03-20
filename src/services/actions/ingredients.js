import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
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
      type: GET_ITEMS_REQUEST,
    });
    fetchIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_ERROR,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ITEMS_ERROR,
        })
      );
  };
}
