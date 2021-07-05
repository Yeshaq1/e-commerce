import {
  PROFILEDETAILS_FAILURE,
  PROFILEDETAILS_REQUEST,
  PROFILEDETAILS_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../constants/profileConstants';

export const profileReducer = (
  state = { userProfile: { name: '', password: '', email: '' } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILEDETAILS_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case PROFILEDETAILS_SUCCESS:
      return {
        loading: false,
        userProfile: payload,
        error: null,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        userProfile: payload,
        error: null,
        success: true,
      };

    case PROFILEDETAILS_FAILURE:
    case PROFILE_UPDATE_FAILURE:
      return { ...state, loading: false, error: payload, success: null };

    default:
      return state;
  }
};
