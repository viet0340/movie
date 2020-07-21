import axios from 'axios';

export async function addWatchIsLaterAPI(token, watch) {
  await axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_API_URL}/api/user/watchIsLater`,
    headers: {
      'x-auth-token': token,
    },
    data: {
      watchIsLater: watch,
    },
  });
}
export async function checkTokenIsValid(token) {
  const isToken = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/api/user/tokenIsValid`,
    headers: {
      'x-auth-token': token,
    },
  });
  return isToken.data;
}

export async function userResponse(token) {
  const user = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/api/user`,
    headers: {
      'x-auth-token': token,
    },
  });

  return user.data;
}
export async function register(data) {
  const user = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/api/user/register`,
    data: data,
  });

  return user.data;
}
export async function login(data) {
  const user = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/api/user/login`,
    data: data,
  });
  return user.data;
}
