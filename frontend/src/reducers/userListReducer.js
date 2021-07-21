import {
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
