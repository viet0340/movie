import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import './index.scss';

WatchIsLaterAlert.propTypes = {
  alert: PropTypes.string,
  variant: PropTypes.string,
};

WatchIsLaterAlert.defaultProps = {
  alert: '',
  variant: '',
};

function WatchIsLaterAlert(props) {
  const { alert, variant } = props;
  if(!alert){
    return<></>
  }
  return (
    <div className='watchIsLater'>
      <Alert className='alertPop my-1 px-2 py-0' variant={variant}>
        {alert}
      </Alert>
    </div>
  );
}

export default WatchIsLaterAlert;
