import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
MovieBoxSlide.propTypes = {
  data: PropTypes.array,
};

MovieBoxSlide.defaultProps = {
  data: null,
};
function MovieBoxSlide(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return (
    <div className='movieBox'>
      <Helmet>
        <title>Phim</title>
      </Helmet>
      {data.map((data, key) => (
        <Link
          to={{ state: { id: data._id }, pathname: `/movie/${data.title_tag}` }}
          key={key}
        >
          <div className='movieBox-items'>
            <div>
              <img className='movieBox-img' src={data.poster} alt='' />
              <div>
                <div className='movieBox-title'>{data.title}</div>
                <div className='movieBox-evaluate'>
                  {data.release_date.slice(data.release_date.length - 4)}
                  <span>
                    <i className='fas fa-star'></i>
                    {data.evaluate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieBoxSlide;
