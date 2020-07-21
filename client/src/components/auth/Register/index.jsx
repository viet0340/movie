import React, { useEffect } from 'react';
import { useState } from 'react';

import './index.scss';
import { register, login } from 'api/user';
import ErrorNotice from 'components/misc/ErrorNotice';
import { useDispatch } from 'react-redux';
import { addUserAction } from 'components/redux/actions';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { checkLogin } from 'controllers/auth';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [alert, setAlert] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const check = async () => {
      const a = await checkLogin(dispatch);
      setCheck(a);
    };
    check();
  }, [dispatch]);

  if (check) {
    history.push('/');
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      const userLogin = { email: user.email, password: user.password };
      const userRes = await login(userLogin);

      setAlert(`Đăng ký thành công. Trình duyệt sẽ load lại sau 5s or `);
      dispatch(addUserAction(userRes));
      localStorage.setItem('auth-token', userRes.token);

      setTimeout(() => {
        history.push('/');
        window.location.reload();
      }, 5000);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  const goBack = () => {
    history.push('/');
    window.location.reload();
  };
  return (
    <div className='_register'>
      <form onSubmit={onSubmit}>
        {error && <ErrorNotice error={error} />}
        {alert && (
          <Alert variant='success'>
            {alert}{' '}
            <button
              onClick={goBack}
              style={{ backgroundColor: 'transparent', color: '#636300' }}
            >
              Click vào đây
            </button>
          </Alert>
        )}
        <div className='_register_items'>
          <label htmlFor='email'>Email *</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Nhập email'
            onChange={handleChange}
          />
        </div>
        <div className='_register_items'>
          <label htmlFor='password'>Mật khẩu *</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Nhập mật khẩu'
            onChange={handleChange}
          />
        </div>
        <div className='_register_items'>
          <label htmlFor='passwordCheck'>Nhập lại mật khẩu *</label>
          <input
            type='password'
            name='passwordCheck'
            id='passwordCheck'
            placeholder='Nhập lại mật khẩu'
            onChange={handleChange}
          />
        </div>
        <div className='_register_items'>
          <label htmlFor='displayName'>Tên Hiển Thị</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            placeholder='Tên hiển thị'
            onChange={handleChange}
          />
        </div>
        <button>Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
