import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
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

    case USER_LIST_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
