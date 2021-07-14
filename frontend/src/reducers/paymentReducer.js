import {
  PAYMENT_INTENT_FAIL,
  PAYMENT_INTENT_REQUEST,
  PAYMENT_INTENT_SUCCESS,
} from '../constants/paymentConstants';

export const paymentIntentReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_INTENT_REQUEST:
      return { loading: true };

    case PAYMENT_INTENT_SUCCESS:
      return { loading: false, clientSecret: payload };

    case PAYMENT_INTENT_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
