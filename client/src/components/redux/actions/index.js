import {
  ADD_USER,
  REMOVE_USER,
  IFRAME_TRUE,
  IFRAME_FALSE,
} from './actionTypes';

export const addUserAction = (token, user) => {
  return {
    type: ADD_USER,
    token,
    user,
  };
};
export const removeUserAction = () => {
  return {
    type: REMOVE_USER,
  };
};

export const iframeIsTrue = (url) => {
  return {
    type: IFRAME_TRUE,
    url: url,
  };
};
export const iframeIsFalse = () => {
  return {
    type: IFRAME_FALSE,
  };
};

export const showModel = () => {
  return {
    type: 'SHOW_MODEL',
  };
};
export const hiddenModel = () => {
  return {
    type: 'HIDDEN_MODEL',
  };
};
