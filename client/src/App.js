import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from 'components/pages/Admin';
import Home from 'components/pages/Home';
import store from 'components/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';




function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route path='/' component={Home} />
          </Switch>
        </Provider>
      </Router>
    </>
  );
}

export default App;
