// @flow
import React from 'react';
import { connect } from 'react-redux';
/* eslint-disable max-len */
import PreviewInfoMovie from '../../containers/PreviewInfoMovie/PreviewInfoMovie';
/* eslint-enable max-len */
import FormSearch from '../../containers/FormSearch/FormSearch';
import ResultList from '../../containers/ResultList/ResultList';
import MovieNotFound from '../MovieNotFound/MovieNotFound';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

import { showComponentOrNull } from '../../utils/helpers';

const Content = ({
  valueOfSearchInput,
  sentRequest,
  hasErrored,
  isLoading,
  movies,
  movie
}) => {
  const conditionMovieNotFound =
    valueOfSearchInput.length > 0 &&
    movies.length === 0 &&
    isLoading === false &&
    hasErrored === false &&
    sentRequest;

  const getPreviewInfoMovie = showComponentOrNull(
    <PreviewInfoMovie />,
    Object.keys(movie).length > 0
  );
  const getMovieNotFound = showComponentOrNull(
    <MovieNotFound />,
    conditionMovieNotFound
  );
  const getResultList = showComponentOrNull(<ResultList />, movies.length > 0);
  const getLoader = showComponentOrNull(<Loader />, isLoading);
  const getError = showComponentOrNull(<Error />, hasErrored);

  return (
    <div className='content'>
      <FormSearch />
      {getPreviewInfoMovie}
      {getMovieNotFound}
      {getResultList}
      {getLoader}
      {getError}
    </div>
  );
};

const mapStateToProps = state => ({
  valueOfSearchInput: state.valueOfSearchInput,
  sentRequest: state.sentRequest,
  hasErrored: state.fetchErrored,
  isLoading: state.fetchLoading,
  movies: state.movies,
  movie: state.movie
});

export default connect(mapStateToProps)(Content);
