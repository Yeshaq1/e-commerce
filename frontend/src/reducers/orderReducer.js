import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: payload, success: true };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderGetReducer = (
  state = {
    order: {},
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_GET_REQUEST:
      return { loading: true };

    case ORDER_GET_SUCCESS:
      return { loading: false, order: payload };

    case ORDER_GET_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
