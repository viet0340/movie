import { getAllMovie } from 'api/movie';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieAdd from './MovieAdd';
import MovieEdit from './MovieEdit';
import MovieList from './MovieList';

function Movie() {
  const [movieData, setMovieData] = useState();
  useEffect(() => {
    async function fetchData() {
      setMovieData(await getAllMovie());
    }
    fetchData();
  }, []);
  if (!movieData) {
    return <div></div>;
  }
  return (
    <div>
      <MovieList movieData={movieData.data} />
      <Switch>
        <Route path='/admin/movie/edit/:id' component={MovieEdit} />
        <Route path='/admin/movie/add' component={MovieAdd} />
      </Switch>
    </div>
  );
}

export default Movie;
