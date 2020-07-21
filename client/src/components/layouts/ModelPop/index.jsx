import { hiddenModel } from 'components/redux/actions';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

ModelPop.propTypes = {
  isShow: PropTypes.bool,
};

ModelPop.defaultProps = {
  isShow: false,
};

function ModelPop(props) {
  const { isShow } = props;
  const [show, setShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  console.log(show);
  useEffect(() => {
    const checkShow = () => {
      setShow(isShow);
    };
    checkShow();
  }, [isShow]);

  const handleClose = () => {
    setShow(false);
    return dispatch(hiddenModel());
  };

  const handleRedirect = () => {
    setShow(false);
    history.push('/login');
    return dispatch(hiddenModel());
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>Vui lòng đăng nhập để sử dụng tính năng này</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Đóng
        </Button>
        <Button variant='primary' onClick={handleRedirect}>
          Đăng nhập
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModelPop;
