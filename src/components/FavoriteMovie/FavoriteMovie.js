// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import * as API from '../../constants/api';
import clapperboard from '../../assets/img/clapperboard-film.jpg';
import background from '../../assets/img/movie-bg.jpg';
import DustbinSvgIcon from '../../assets/icons/DustbinSvgIcon';

import { withFirebase } from '../../components/Firebase';

import { transformData } from '../../utils/helpers';

const styles = {
  bounceInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInUp, 'bounce')
  }
};

const FavoriteMovie = ({ authUser, firebase, item }) => {
  const transformedDataMovie = transformData(
    item,
    API.BACKDROP_IMG,
    API.POSTER_IMG,
    clapperboard,
    background
  );

  const deleteFavoriteMovie = () => {
    firebase.movies(authUser).on('value', data => {
      let newFavouritesMoviesArray = data.val()
        ? data.val().filter(elem => elem.id !== item.id)
        : null;
      firebase.movies(authUser).set(newFavouritesMoviesArray);
    });
  };

  return (
    <StyleRoot>
      <div className='favorite-movie' style={styles.bounceInUp}>
        <div className='favorite-movie__poster'>
          <img
            className='favorite-movie__img'
            src={transformedDataMovie.image}
            alt=''
          />
        </div>
        <div className='favorite-movie__content'>
          <h4 className='favorite-movie__title'>
            {transformedDataMovie.title}
          </h4>
          <h4 className='favorite-movie__year'>{transformedDataMovie.year}</h4>
          <div className='favorite-movie__svg' onClick={deleteFavoriteMovie}>
            <DustbinSvgIcon />
          </div>
        </div>
      </div>
    </StyleRoot>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default compose(withFirebase, connect(mapStateToProps))(FavoriteMovie);
