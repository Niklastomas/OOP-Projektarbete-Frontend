import { Fade } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeView from './views/homeView/HomeView';
import MovieDetailsView from './views/movieDetailsView/MovieDetailsView';
import TopRatedView from './views/topRatedView/TopRatedView';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/movie/:id' component={MovieDetailsView} />
          <Route path='/toprated' component={TopRatedView} />
          <Route exact path='/' component={HomeView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
