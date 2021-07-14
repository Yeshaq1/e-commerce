import {
  PAYMENT_INTENT_FAIL,
  PAYMENT_INTENT_REQUEST,
  PAYMENT_INTENT_SUCCESS,
} from '../constants/paymentConstants';
import axios from 'axios';

export const createPaymentIntent = (totalPrice) => async (dispatch) => {
  dispatch({ type: PAYMENT_INTENT_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.get(
      '/api/payment/intent',
      totalPrice,
      config,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: PAYMENT_INTENT_SUCCESS,
      payload: data.clientSecret,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_INTENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
