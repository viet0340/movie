import { getMovieForType, moviesWatchIsLater } from 'api/movie';
import MovieBoxSlide from 'components/layouts/MovieBoxSlide';
import MovieBox from 'components/layouts/MovieBox';
import MOVIE from 'configs/movie.input';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './index.scss';

function TabHeader() {
  const [data, setData] = useState({});
  const watch = localStorage.getItem('watch-is-later');
  useEffect(() => {
    const fetchData = async () => {
      const types = ['trends', 'popular', 'premium'];

      const [trends, popular, premium] = await Promise.all(
        types.map((map) => getMovieForType(map))
      );

      let mylist;
      if (watch) {
        mylist = await moviesWatchIsLater(JSON.parse(watch));
      }

      setData({
        trends,
        popular,
        premium,
        mylist,
      });
    };
    fetchData();
  }, [watch]);
  return (
    <Tabs defaultActiveKey='trends' className='tabHeader'>
      {MOVIE.tabHeader.map((tab, key) => (
        <Tab
          key={key}
          eventKey={tab.value}
          title={
            <div>
              <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
              {tab.name}
            </div>
          }
        >
          {tab.value === 'trends' && (
            <MovieBoxSlide data={data.trends} autoplay={true} />
          )}
          {tab.value === 'popular' && (
            <MovieBoxSlide data={data.popular} autoplay={true} />
          )}
          {tab.value === 'premium' && (
            <MovieBoxSlide data={data.premium} autoplay={true} />
          )}
          {tab.value === 'mylist' && (
            <>
              {data.mylist ? (
                <MovieBox data={data.mylist} autoplay={true} />
              ) : (
                <h3 className='py-5'>Bạn chưa có phim nào trong danh sách</h3>
              )}
            </>
          )}
        </Tab>
      ))}
    </Tabs>
  );
}

export default TabHeader;
