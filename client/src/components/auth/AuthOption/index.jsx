import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserAction } from 'components/redux/actions';
import './index.scss';

const AuthOption = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    dispatch(removeUserAction());
    localStorage.setItem('auth-token', '');
    localStorage.setItem('watch-is-later', '');
    window.location.reload();
  };
  return (
    <div className='auth_option'>
      {userData.user ? (
        <button className='logout button-auth' onClick={logout}>
          Đăng xuất
        </button>
      ) : (
        <>
          <button className='register button-auth' onClick={register}>
            Đăng ký
          </button>
          /
          <button className='login button-auth' onClick={login}>
            {' '}
            Đăng nhập
          </button>
        </>
      )}
    </div>
  );
};

export default AuthOption;
