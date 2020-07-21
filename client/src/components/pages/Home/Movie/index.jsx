import { getAllMovie } from 'api/movie';
import Filter from 'components/layouts/Filter';
import MovieBox from 'components/layouts/MovieBox';
import MovieDetail from 'components/layouts/MovieDetail';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.scss';
function Movie() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const params = {
        _page: 1,
        _limit: 10,
        _name: 'latest',
      };
      const [data] = await Promise.all([getAllMovie(params)]);
      setData(data);
    }
    fetchData();
  }, []);
  if (!data) {
    return <div></div>;
  }

  function handleChange(e) {
    setData(e);
  }
  return (
    <div className='movie'>
      <Switch>
        <Route path='/movie/:title' component={MovieDetail} />
        <Route
          path='/movie/'
          exact
          render={() => (
            <div>
              <Filter onChange={handleChange} />
              <MovieBox data={data.data} />
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default Movie;
