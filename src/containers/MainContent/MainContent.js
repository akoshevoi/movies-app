// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
/* eslint-disable max-len */
import StorageFavouritesMovie from '../../components/StorageFavouritesMovies/StorageFavouritesMovies';
/* eslint-enable max-len */
import ExplicitInfoMovie from '../ExplicitInfoMovie/ExplicitInfoMovie';
import Content from '../../components/Content/Content';
import Account from '../../components/Account/Account';
import NotFound from '../../components/NotFound/NotFound';

const MainContent = ({ movie }) => (
  <main className='main-content'>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Content} />
      <Route
        path={ROUTES.EXPLICIT_INFO_MOVIE}
        render={() =>
          Object.keys(movie).length > 0 ? (
            <ExplicitInfoMovie />
          ) : (
            <Redirect to='/' />
          )
        }
      />
      <Route
        path={ROUTES.STORAGE_FAVOURITES_MOVIES}
        component={StorageFavouritesMovie}
      />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(mapStateToProps)(MainContent);
