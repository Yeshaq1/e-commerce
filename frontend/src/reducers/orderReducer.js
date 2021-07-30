import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_FAIL,
  ORDERS_GET_ALL_REQUEST,
  ORDERS_GET_ALL_SUCCESS,
  ORDERS_GET_ALL_FAIL,
  ORDERS_UPDATE_REQUEST,
  ORDERS_UPDATE_SUCCESS,
  ORDERS_UPDATE_FAIL,
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

export const ordersGetReducer = (
  state = {
    orders: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_GET_REQUEST:
      return { loading: true };

    case ORDERS_GET_SUCCESS:
      return { loading: false, orders: payload };

    case ORDERS_GET_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const GetAllOrdersReducer = (
  state = {
    orders: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_GET_ALL_REQUEST:
      return { loading: true };

    case ORDERS_GET_ALL_SUCCESS:
      return { loading: false, orders: payload };

    case ORDERS_GET_ALL_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_UPDATE_REQUEST:
      return { loading: true };

    case ORDERS_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case ORDERS_UPDATE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
