import {
  PAYMENT_INTENT_FAIL,
  PAYMENT_INTENT_REQUEST,
  PAYMENT_INTENT_SUCCESS,
} from '../constants/paymentConstants';
import axios from 'axios';

export const createPaymentIntent = (cartDetails) => async (dispatch) => {
  dispatch({ type: PAYMENT_INTENT_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(cartDetails);

  try {
    const { data } = await axios.post('/api/payment/intent', body, config, {
      withCredentials: true,
    });

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
