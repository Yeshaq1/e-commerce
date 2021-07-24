import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAIL_FAILURE,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from '../constants/authConstants';

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: payload,
      };

    case USER_LIST_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case USER_DELETE_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const userDetailReducer = (
  state = { user: { name: '', email: '', isAdmin: '' }, success: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAIL_SUCCESS:
      return {
        loading: false,
        user: payload,
        success: true,
      };

    case USER_DETAIL_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case USER_DETAIL_RESET:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
