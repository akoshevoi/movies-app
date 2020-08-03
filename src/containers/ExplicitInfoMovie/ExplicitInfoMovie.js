// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { CSSTransition } from 'react-transition-group';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import * as API from '../../constants/api';
import background from '../../assets/img/movie-bg.jpg';
import clapperboard from '../../assets/img/clapperboard-film.jpg';
import { transformData } from '../../utils/helpers';
/* eslint-disable max-len */
import { searchMatchingInFavouritesMoviesArrayForVisibilityAddMovieBtn } from '../../utils/helpers';
/* eslint-enable max-len */

import { withFirebase } from '../../components/Firebase';

const ExplicitInfoMovie = ({
  transformedCredits,
  authUser,
  firebase,
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

  const transformedDataMovie = transformData(
    movie,
    API.BACKDROP_IMG,
    API.POSTER_IMG,
    clapperboard,
    background
  );

  const selectFavoriteMovie = () => {
    firebase.addFavoriteMovieToDatabase(authUser, movie);
    setVisisbilityAddMovieBtn(false);
  };

  let btnStatus =
    authUser && authUser.favouritesMovies !== undefined
      ? searchMatchingInFavouritesMoviesArrayForVisibilityAddMovieBtn(
          actualFavouritesMoviesArrayFromDB,
          transformedDataMovie.id
        )
      : null;

  return (
    /* eslint-disable max-len */
    <StyleRoot>
      <div
        className='movie-info'
        style={{
          animation: 'x 1s',
          animationName: Radium.keyframes(fadeIn, 'fadeIn'),
          backgroundImage: `url(${transformedDataMovie.background})`
        }}
      >
        <div className='movie-info__background'>
          <div className='container  container--content container--movie-info'>
            <div className='movie-info__inner  movie-info__inner--explicit'>
              <div className='movie-info__poster  movie-info__poster--explicit'>
                <img
                  className='movie-info__img  movie-info__img--explicit'
                  src={transformedDataMovie.image}
                  alt={clapperboard}
                />
              </div>
              <div className='movie-info__content'>
                <div className='movie-info__header'>
                  {transformedDataMovie.title && (
                    <h2 className='movie-info__title movie-info__title--explicit'>
                      {transformedDataMovie.title}
                      {transformedDataMovie.year && (
                        <span className='movie-info__year'>
                          ({transformedDataMovie.year})
                        </span>
                      )}
                    </h2>
                  )}
                  {transformedDataMovie.genre && (
                    <h3 className='movie-info__genre  movie-info__genre--explicit'>
                      {transformedDataMovie.genre && (
                        <span className='movie-info__text'>
                          {transformedDataMovie.genre}
                        </span>
                      )}
                      {transformedDataMovie.runtime && (
                        <span className='movie-info__runtime'>
                          {transformedDataMovie.runtime}
                        </span>
                      )}
                    </h3>
                  )}
                </div>
                <div className='movie-info__subheader  movie-info__subheader--explicit'>
                  {transformedDataMovie.country && (
                    <p className='movie-info__country'>
                      <span className='movie-info__definition'>
                        {transformedDataMovie.country.includes(',')
                          ? 'Countries: '
                          : 'Country: '}
                      </span>
                      <span className='movie-info__meaning'>
                        {transformedDataMovie.country}
                      </span>
                    </p>
                  )}
                  {transformedDataMovie.revenue && (
                    <p className='movie-info__revenue'>
                      <span className='movie-info__definition'>Revenue:</span>
                      <span className='movie-info__meaning'>
                        {transformedDataMovie.revenue}
                      </span>
                    </p>
                  )}
                  {transformedDataMovie.budget && (
                    <p className='movie-info__budget'>
                      <span className='movie-info__definition'>Budget:</span>
                      <span className='movie-info__meaning'>
                        {transformedDataMovie.budget}
                      </span>
                    </p>
                  )}
                  {transformedDataMovie.imdbId && (
                    <p className='movie-info__imdb'>
                      <span className='movie-info__definition'>IMDb:</span>
                      <span className='movie-info__meaning'>
                        {transformedDataMovie.imdbId}
                      </span>
                    </p>
                  )}
                </div>
                {movie.overview && (
                  <p
                    className={`movie-info__overview movie-info__overview--explicit`}
                  >
                    {movie.overview}
                  </p>
                )}
                <div className='movie-info__filmmakers'>
                  {transformedCredits.map(item => (
                    <div className='movie-info__filmmaker' key={item.id}>
                      <p className='movie-info__name'>{item.name}</p>
                      <p className='movie-info__job'>{item.job}</p>
                    </div>
                  ))}
                </div>
                {authUser && !btnStatus ? (
                  <CSSTransition
                    in={visisbilityAddMovieBtn}
                    timeout={500}
                    unmountOnExit
                    classNames='fading-btn'
                  >
                    <button
                      className='movie-info__button  movie-info__button--explicit'
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
    </StyleRoot>
    /* eslint-enable max-len */
  );
};

const mapStateToProps = state => ({
  transformedCredits: state.transformdedCreditsMovie,
  authUser: state.sessionState.authUser,
  movie: state.movie
});

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(ExplicitInfoMovie);
