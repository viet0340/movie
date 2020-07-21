import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Header from 'components/layouts/Header';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './index.scss';
import Main from './Main';
import Movie from './Movie';
import NotFound from 'components/layouts/NotFound';
import Series from './Series';
import { checkLoggedIn } from 'controllers/auth';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedIn(dispatch);
  }, [dispatch]);
  return (
    <div className='home'>
      <Header />

      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/movie' component={Movie} />
        <Route path='/series' component={Series} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Home;
