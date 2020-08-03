// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bounceIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import FavoriteMovie from '../FavoriteMovie/FavoriteMovie';

import { withFirebase } from '../../components/Firebase';
import { withAuthorization } from '../Session';

const styles = {
  bounceIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceIn, 'bounce')
  }
};

const StorageFavouritesMovies = ({ authUser, firebase }) => {
  const [favouritesMoviesArray, setFavouritesMoviesArray] = useState([]);
  useEffect(() => {
    firebase
      .movies(authUser)
      .on('value', data => setFavouritesMoviesArray(data.val()));
  }, [firebase, authUser]);

  if (favouritesMoviesArray) {
    return (
      <div className='favourites-movies'>
        <div className='container  container--content'>
          <div className='favourites-movies__inner'>
            <StyleRoot>
              <h2 className='favourites-movies__title' style={styles.bounceIn}>
                My film collection
              </h2>
            </StyleRoot>
            <div className='favourites-movies__list'>
              {favouritesMoviesArray &&
                favouritesMoviesArray.map(item => (
                  <FavoriteMovie key={item.id} item={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='favourites-movies'>
      <div className='container  container--content'>
        <div className='favourites-movies__inner'>
          <StyleRoot>
            <p className='favourites-movies__message' style={styles.bounceIn}>
              There are no films here yet. Let's find some movie and fix this.
            </p>
          </StyleRoot>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition),
  withFirebase
)(StorageFavouritesMovies);
