import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';

export const createOrder =
  ({
    cartProducts,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    taxPrice,
    itemsPrice,
  }) =>
  async (dispatch) => {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      cartProducts,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      taxPrice,
      itemsPrice,
    });

    try {
      const { data } = await axios.post('/api/orders', body, config, {
        withCredentials: true,
      });

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
