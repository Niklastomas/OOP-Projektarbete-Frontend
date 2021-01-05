import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import HomeView from './views/homeView/HomeView';
import LoginView from './views/loginView/LoginView';
import MovieDetailsView from './views/movieDetailsView/MovieDetailsView';
import PopularView from './views/popularView/PopularView';
import RegisterView from './views/registerView/RegisterView';
import SearchView from './views/searchView/SearchView';
import TopRatedView from './views/topRatedView/TopRatedView';
import TrendingView from './views/trendingView/TrendingView';
import UpcomingView from './views/upcomingView/UpcomingView';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/movie/:id' component={MovieDetailsView} />
          <Route path='/toprated' component={TopRatedView} />
          <Route path='/popular' component={PopularView} />
          <Route path='/trending' component={TrendingView} />
          <Route path='/upcoming' component={UpcomingView} />
          <Route path='/login' component={LoginView} />
          <Route path='/register' component={RegisterView} />
          <PrivateRoute path='/search/:searchText' component={SearchView} />
          <Route exact path='/' component={HomeView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
