import AuthOption from 'components/auth/AuthOption';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Search from './Search';

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [offset, setOffset] = useState();
  const style =
    offset > 0
      ? { backgroundColor: 'rgba(0, 42, 95, 0.9)' }
      : { backgroundColor: 'transparent' };
  function showDesktop() {
    setToggle(false);
  }

  function toggleMenu() {
    setToggle(!toggle);
  }
  const styleMenu = toggle ? { left: 0 } : { left: '-100%' };

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return (
    <div className='nav_bar' style={style}>
      <div className='logo'>
        <a href='/'>
          <img src='/images/logo.png' alt='' />
        </a>
      </div>
      <div className='menu' style={styleMenu}>
        <div className='menu_content'>
          <div className='link'>
            <Link onClick={showDesktop} to='/'>
              Trang chủ
            </Link>
            <Link onClick={showDesktop} to='/movie'>
              Phim
            </Link>
            <Link onClick={showDesktop} to='/series'>
              Phim bộ
            </Link>
          </div>
          <Search />
          <div className='login' onClick={showDesktop}>
            <AuthOption />
          </div>
        </div>
        <div className='other' onClick={showDesktop}></div>
      </div>
      <div className='button_menu' onClick={toggleMenu}>
        <i className='fas fa-bars'></i>
      </div>
    </div>
  );
}

export default Navbar;
