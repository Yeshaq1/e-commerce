import axios from 'axios';
import {
  ORDERS_GET_FAIL,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
} from '../constants/orderConstants';

export const createOrder =
  (
    {
      cartProducts,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      taxPrice,
      itemsPrice,
    },
    { id, status, email_address }
  ) =>
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
      id,
      status,
      email_address,
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

export const getOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_GET_REQUEST });

    const { data } = await axios.get(`/api/orders/${orderId}`);

    dispatch({
      type: ORDER_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_GET_REQUEST });

    const { data } = await axios.get(`/api/orders/myorders`);

    dispatch({
      type: ORDERS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
