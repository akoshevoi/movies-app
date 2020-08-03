// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import * as ROUTES from '../../constants/routes';
import * as API from '../../constants/api';
import { transformReceivedCreditsMovie } from '../../actions/actions';
import clapperboard from '../../assets/img/clapperboard-film.jpg';
import background from '../../assets/img/movie-bg.jpg';
import {
  transformData,
  searchMatchingInFavouritesMoviesArrayForVisibilityAddMovieBtn
} from '../../utils/helpers';

import { withFirebase } from '../../components/Firebase';

const PreviewInfoMovie = ({
  transformReceivedCreditsMovie,
  authUser,
  firebase,
  credits,
  movie
}) => {
  const [visisbilityAddMovieBtn, setVisisbilityAddMovieBtn] = useState(true);
  const [
    actualFavouritesMoviesArrayFromDB,
    setActualFavouritesMoviesArrayFromDB
  ] = useState([]);
  useEffect(() => {
    if (authUser) {
      firebase
        .movies(authUser)
        .on('value', data => setActualFavouritesMoviesArrayFromDB(data.val()));
    }
  }, [firebase, authUser]);

  let history = useHistory();

  const goToSpecificMovie = () => {
    transformReceivedCreditsMovie(credits);
    history.push(ROUTES.EXPLICIT_INFO_MOVIE);
  };

  const selectFavoriteMovie = () => {
    firebase.addFavoriteMovieToDatabase(authUser, movie);
    setVisisbilityAddMovieBtn(false);
  };

  const transformedDataMovie = transformData(
    movie,
    API.BACKDROP_IMG,
    API.POSTER_IMG,
    clapperboard,
    background
  );

  let btnStatus =
    authUser && authUser.favouritesMovies !== undefined
      ? searchMatchingInFavouritesMoviesArrayForVisibilityAddMovieBtn(
          actualFavouritesMoviesArrayFromDB,
          transformedDataMovie.id
        )
      : null;

  return (
    <StyleRoot>
      <div
        className='movie-info  movie-info--preview'
        style={{
          animation: 'x 1s',
          animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
          backgroundImage: `url(${transformedDataMovie.background})`
        }}
      >
        <div className='movie-info__background'>
          <div className='container  container--content'>
            <div className='movie-info__inner  movie-info__inner--preview'>
              <div className='movie-info__poster  movie-info__poster--preview'>
                <img
                  className='movie-info__img  movie-info__img--preview'
                  src={transformedDataMovie.image}
                  alt={clapperboard}
                />
              </div>
              {/* eslint-disable max-len */}
              <div className='movie-info__content  movie-info__content--preview'>
                {/* eslint-enable max-len */}
                <div className='movie-info__header'>
                  {transformedDataMovie.title && (
                    <h2 className='movie-info__title'>
                      {transformedDataMovie.title}
                      {transformedDataMovie.year && (
                        <span className='movie-info__year'>
                          ({transformedDataMovie.year})
                        </span>
                      )}
                    </h2>
                  )}
                  {transformedDataMovie.genre && (
                    <h3 className='movie-info__genre'>
                      {transformedDataMovie.genre}
                    </h3>
                  )}
                </div>
                {transformedDataMovie.overview && (
                  <p className='movie-info__overview'>
                    {transformedDataMovie.overview}
                  </p>
                )}
                <div className='movie-info__button-group'>
                  <button
                    className='movie-info__button'
                    onClick={goToSpecificMovie}
                  >
                    See more
                  </button>
                  {authUser && !btnStatus ? (
                    <CSSTransition
                      in={visisbilityAddMovieBtn}
                      timeout={500}
                      unmountOnExit
                      classNames='fading-btn'
                    >
                      <button
                        className='movie-info__button'
                        onClick={selectFavoriteMovie}
                      >
                        Add movie
                      </button>
                    </CSSTransition>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyleRoot>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  credits: state.creditsMovie,
  movie: state.movie
});

const mapDispatchToProps = dispatch => ({
  transformReceivedCreditsMovie: credits =>
    dispatch(transformReceivedCreditsMovie(credits))
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(PreviewInfoMovie);
