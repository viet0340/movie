import { checkTokenIsValid, userResponse } from 'api/user';
import { addUserAction } from 'components/redux/actions';

export const checkLoggedIn = async (dispatch) => {
  let token = localStorage.getItem('auth-token');
  if (token === null) {
    token = '';
    localStorage.setItem('auth-token', '');
    localStorage.setItem('watch-is-later', '');
  }

  const tokenRes = await checkTokenIsValid(token);

  if (tokenRes) {
    const userRes = await userResponse(token);
    dispatch(addUserAction(token, userRes));
  }
};

export const checkLogin = async (dispatch) => {
  let token = localStorage.getItem('auth-token');
  if (token === null) {
    token = '';
    localStorage.setItem('auth-token', '');
  }
  const tokenRes = await checkTokenIsValid(token);

  if (tokenRes) {
    const userRes = await userResponse(token);
    dispatch(addUserAction(token, userRes));
  }

  return tokenRes;
};
