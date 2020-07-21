import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllMovie } from 'api/movie';
import MovieBoxSlide from 'components/layouts/MovieBoxSlide';
import './index.scss';
function TabFooter() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const a = await getAllMovie();
      setData(a);
    }
    fetchData();
  }, []);
  if (!data) {
    return <div></div>;
  }
  return (
    <div className='tabFooter'>
      <MovieBoxSlide data={data.data} autoplay={true} />
    </div>
  );
}

export default TabFooter;
