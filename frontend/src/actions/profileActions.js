import {
  PROFILEDETAILS_FAILURE,
  PROFILEDETAILS_REQUEST,
  PROFILEDETAILS_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../constants/profileConstants';

import axios from 'axios';
import { LOGIN_SUCCESS } from '../constants/authConstants';

// get profile Action
export const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILEDETAILS_REQUEST });

    const { data } = await axios.get('/api/users/profile', {
      withCredentials: true,
    });

    dispatch({
      type: PROFILEDETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILEDETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      dispatch({ type: PROFILE_UPDATE_REQUEST });

      const { data } = await axios.put('api/users/profile', body, config, {
        withCredentials: true,
      });

      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
