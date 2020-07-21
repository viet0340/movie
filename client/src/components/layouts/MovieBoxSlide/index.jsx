import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import './index.scss';
import { Link } from 'react-router-dom';
MovieBoxSlide.propTypes = {
  data: PropTypes.array,
  autoplay: PropTypes.bool,
};

MovieBoxSlide.defaultProps = {
  data: null,
  autoplay: false,
};
function MovieBoxSlide(props) {
  const { data, autoplay } = props;
  if (!data) {
    return <div></div>;
  }
  var settings = {
    slidesToShow: 5,
    dots: false,
    infinite: true,
    speed: 500,
    slidesPerRow: 1,
    autoplay: autoplay ? autoplay : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className='movieBoxSlide'>
      <Slider {...settings}>
        {data.map((data, key) => (
          <Col key={key} className='movieBoxSlide-items'>
            <Link
              to={{
                state: { id: data._id },
                pathname: `/movie/${data.title_tag}`,
              }}
              key={key}
            >
              <Card>
                <Card.Img
                  className='movieBoxSlide-img'
                  variant='top'
                  src={data.poster}
                />
                <Card.Body>
                  <Card.Text className='movieBoxSlide-title'>
                    {data.title}
                  </Card.Text>
                  <Card.Text className='movieBoxSlide-evaluate'>
                    {data.release_date.slice(data.release_date.length - 4)}
                    <span>
                      <i className='fas fa-star'></i>
                      {data.evaluate}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Slider>
    </div>
  );
}

export default MovieBoxSlide;
