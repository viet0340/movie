import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Movie from './Movie';

function Admin() {
  return (
    <div>
      <Switch>
        <Route path='/admin/movie' component={Movie} />
      </Switch>
    </div>
  );
}

export default Admin;
