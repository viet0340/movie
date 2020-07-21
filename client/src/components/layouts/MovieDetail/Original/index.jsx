import { callURL } from 'api/movie';
import WatchIsLaterAlert from 'components/layouts/WatchIsLaterAlert';
import { iframeIsTrue } from 'components/redux/actions';
import { checkLogin } from 'controllers/auth';
import { addWatchIsLater } from 'controllers/watchIsLater';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.scss';
Original.propTypes = {
  data: PropTypes.object,
};

Original.defaultProps = {
  data: null,
};

function Original(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState();
  const [variant, setVariant] = useState();

  if (!data) {
    return <div></div>;
  }
  const handleWatchLater = async (id) => {
    const data = await addWatchIsLater(id, dispatch);

    setAlert(data.alert);
    setVariant(data.variant);

    setTimeout(() => {
      setAlert('');
      setVariant('');
    }, 3000);
  };
  async function handlePlay(e) {
    if (e.some((some) => some === 'premium')) {
      const a = await checkLogin(dispatch);
      if (!a) {
        return setShow(!a);
      }
      const url = await callURL(data._id);
      return dispatch(iframeIsTrue(url));
    }
    const url = await callURL(data._id);
    return dispatch(iframeIsTrue(url));
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleRedirect = () => {
    setShow(false);
    history.push('/login');
  };
  return (
    <div className='top'>
      <div className='content'>
        <div className='premium'>
          {data.type.some((some) => some === 'premium') && (
            <div className='premium'>
              Premium
              <i className='fas fa-star'></i>
            </div>
          )}
        </div>

        <div className='title'>{data.title}</div>
        <div className='duration'>Thời lượng: {data.duration} phút</div>
        <div className='description'>{data.description}</div>
        <div className='button'>
          <div className='watch' onClick={() => handlePlay(data.type)}>
            <i className='fas fa-play'></i>
            <span>Xem ngay</span>
          </div>
          <div className='add-list' onClick={() => handleWatchLater(data._id)}>
            <i className='fas fa-plus'></i>
            <span>Xem sau</span>
          </div>
          {alert && <WatchIsLaterAlert variant={variant} alert={alert} />}
        </div>
        <i className='fas fa-thumbs-up icon'></i>
        <i className='fas fa-thumbs-down icon'></i>
      </div>
      <div className='image'>
        <img src={data.image} alt='' />
        <div className='after'></div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Đăng nhập để xem phim này</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleRedirect}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Original;
