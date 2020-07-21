import { getAllMovie } from 'api/movie';
import { changeVN } from 'configs/movie.genre.vn';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { useDispatch } from 'react-redux';
import { addWatchIsLater } from 'controllers/watchIsLater';
import WatchIsLaterAlert from 'components/layouts/WatchIsLaterAlert';
function Film() {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState();
  const [variant, setVariant] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const a = await getAllMovie();
      setData(a.data[Math.round(Math.random() * a.data.length)]);
    }
    fetchData();
  }, []);

  const style = data
    ? {
        backgroundImage: `url(${data.image})`,
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }
    : {};

  const handleWatchLater = async (id) => {
    const data = await addWatchIsLater(id, dispatch);

    setAlert(data.alert);
    setVariant(data.variant);

    setTimeout(() => {
      setAlert('');
      setVariant('');
    }, 3000);
  };
  if (!data) {
    return <div></div>;
  }
  return (
    <div className='film'>
      <div className='film_content' style={style}>
        <div className='film_background'>
          <div className='film_duration'>
            <span>Thời lượng: </span>
            {data.duration}
            <span> phút</span>
          </div>
          <div className='film_title'>{data.title}</div>
          <div className='film_evaluate'>
            <span>
              <i className='fas fa-star'></i>
            </span>
            {data.evaluate}
            <span className='tags'>
              {data.tags && changeVN(data.tags).join(' / ')}
            </span>
          </div>
          <div className='film_description'>{data.description}</div>
          <div className='watch'>
            <i className='fas fa-play'></i>
            <Link
              to={{
                pathname: `/movie/${data.title_tag}`,
                state: { id: data._id },
              }}
            >
              <span>Xem ngay</span>
            </Link>
          </div>
          <div className='add-list' onClick={() => handleWatchLater(data._id)}>
            <i className='fas fa-plus'></i>
            <span>Xem sau</span>
          </div>
          {alert && <WatchIsLaterAlert variant={variant} alert={alert} />}
        </div>
      </div>
    </div>
  );
}

export default Film;
