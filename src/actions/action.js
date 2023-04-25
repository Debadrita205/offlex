import {TYPE} from '../constants/types';

export const setRole = data => {
  return {
    type: TYPE.SET_ROLE,
    payload: {
      data,
    },
  };
};
export const setEmail = email => {
  return {
    type: TYPE.SET_EMAIL,
    payload: {email: email},
  };
};
export const auth = data => {
  return {
    type: TYPE.AUTH,
    payload: {
      data,
    },
  };
};

export const setProfile = data => {
  return {
    type: TYPE.SET_PROFILE,
    payload: {
      data,
    },
  };
};
export const setNotification = data => {
  return {
    type: TYPE.SET_NOTIFICATION,
    payload: {
      data,
    },
  };
};
export const setCategory = data => {
  return {
    type: TYPE.SET_CATEGORY,
    payload: {
      category: data,
    },
  };
};
export const setLoading = data => {
  return {
    type: TYPE.SET_LOADING,
    payload: {
      isLoading: data,
    },
  };
};
