import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

ErrorNotice.propTypes = {
  error: PropTypes.string,
};

ErrorNotice.defaultProps = {
  error: '',
};

function ErrorNotice(props) {
  const { error } = props;
  if (!error) return <></>;
  return <Alert variant='danger' className='p-1'>{error}</Alert>;
}

export default ErrorNotice;
