import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
} from '.';
import {getResponse, postUrl} from "../../utils/fetchIngredients";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getOrderOfNumber = (ingredients) => {
  return fetch(`${postUrl}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({  ingredients }),
  }).then((res) => {
    return getResponse(res);
  });
};

export function getOrder(listId) {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderOfNumber(listId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderData: res,
          });
          dispatch({
            type: CLEAR_CONSTRUCTOR_INGREDIENTS,
          });
        } else {
          dispatch({
            type: GET_ORDER_ERROR,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ORDER_ERROR,
        })
      );
  };
}
