import ModelPop from 'components/layouts/ModelPop';
import WatchIsLaterAlert from 'components/layouts/WatchIsLaterAlert';
import { changeVN } from 'configs/movie.genre.vn';
import { addWatchIsLater } from 'controllers/watchIsLater';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';

Banner.propTypes = {
  banner: PropTypes.array,
};

Banner.defaultProps = {
  banner: [],
};

function Banner(props) {
  const { banner } = props;
  const show = useSelector((state) => state.modelReducer.show);
  const [alert, setAlert] = useState();
  const [variant, setVariant] = useState();

  const dispatch = useDispatch();

  const handleWatchLater = async (id) => {
    const data = await addWatchIsLater(id, dispatch);

    setAlert(data.alert);
    setVariant(data.variant);

    setTimeout(() => {
      setAlert('');
      setVariant('');
    }, 3000);
  };
  if (!banner) {
    return <div></div>;
  }
  return (
    <>
      <Carousel>
        {banner.map((map, key) => (
          <Carousel.Item key={key} className='banner_items'>
            <img className='d-block w-100' src={map.image} alt='' />
            <Carousel.Caption className='banner_caption'>
              <div className='banner_caption_content'>
                <div className='banner_duration'>
                  <span>Thời lượng: </span>
                  {map.duration}
                  <span> phút</span>
                </div>
                <div className='banner_title'>{map.title}</div>
                <div className='banner_evaluate'>
                  <span>
                    <i className='fas fa-star'></i>
                  </span>
                  {map.evaluate}
                  <span className='tags'>{changeVN(map.tags).join(' / ')}</span>
                </div>
                <div className='banner_description'>{map.description}</div>
                <div className='watch'>
                  <i className='fas fa-play'></i>
                  <Link
                    to={{
                      pathname: `/movie/${map.title_tag}`,
                      state: { id: map._id },
                    }}
                  >
                    <span>Xem ngay</span>
                  </Link>
                </div>
                <div
                  className='add-list'
                  onClick={() => handleWatchLater(map._id)}
                >
                  <i className='fas fa-plus'></i>
                  <span>Xem sau</span>
                </div>
                {alert && <WatchIsLaterAlert variant={variant} alert={alert} />}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {show && <ModelPop isShow={show} />}
    </>
  );
}

export default Banner;
