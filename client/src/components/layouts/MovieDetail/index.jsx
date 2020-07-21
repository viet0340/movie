import { getMovieForID } from 'api/movie';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Iframe from './Iframe';
import './index.scss';
import Original from './Original';
import Tab from './Tab';

function MovieDetail(props) {
  const [data, setData] = useState();
  const { id } = props.location.state;

  useEffect(() => {
    async function fetchData() {
      setData(await getMovieForID(id));
    }
    fetchData();
  }, [id]);

  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className='detail-movie'>
        <Iframe />
        <Original data={data} />
        <Tab data={data} />
      </div>
    </div>
  );
}

export default MovieDetail;
