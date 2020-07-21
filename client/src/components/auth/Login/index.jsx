import { login } from 'api/user';
import ErrorNotice from 'components/misc/ErrorNotice';
import { addUserAction } from 'components/redux/actions';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';
import { checkLogin } from 'controllers/auth';

const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [alert, setAlert] = useState();
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

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
      const userRes = await login(user);

      setAlert(`Đăng nhập thành công. Trình duyệt sẽ load lại sau 5s or `);
      dispatch(addUserAction(userRes));
      
      localStorage.setItem('auth-token', userRes.token);
      localStorage.setItem(
        'watch-is-later',
        JSON.stringify(userRes.user.watchIsLater)
      );
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
    <div className='_login'>
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
        <div className='_login_items'>
          <label htmlFor='email'>Email *</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Nhập email'
            onChange={handleChange}
          />
        </div>
        <div className='_login_items'>
          <label htmlFor='password'>Mật khẩu *</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Nhập mật khẩu'
            onChange={handleChange}
          />
        </div>
        <button>Đăng Nhập</button>
        <span>
          or <Link to='/register'>Đăng ký</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
