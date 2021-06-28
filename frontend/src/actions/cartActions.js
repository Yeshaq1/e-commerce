import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import { PRODUCT_DETAILS_FAIL } from '../constants/productConstants';
import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        ...data,
        qty,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartDetail.cartProducts)
  );
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartDetail.cartProducts)
  );
};
