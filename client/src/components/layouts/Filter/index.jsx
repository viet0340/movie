import { getAllMovie } from 'api/movie';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import './index.scss';
Filter.propTypes = {
  onChange: PropTypes.func,
};

function Filter(props) {
  const { onChange } = props;

  async function handleChange(e) {
    const value = e.target.value;
    const params = {
      _page: 1,
      _limit: 10,
      _name: value,
    };
    onChange(await getAllMovie(params));
  }

  return (
    <div className='filter'>
      <Form className='select'>
        <Form.Group>
          <Form.Control
            as='select'
            onChange={handleChange}
            defaultValue='latest'
          >
            <option value='a'>Tên A &uarr; Z</option>
            <option value='z'>Tên Z &darr; A</option>
            <option value='latest'>Năm phát hành (mới nhất)</option>
            <option value='oldest'>Năm phát hành (cũ nhất)</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Filter;
