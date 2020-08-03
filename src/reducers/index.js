// @flow
import { combineReducers } from 'redux';
import {
  transformdedCreditsMovie,
  valueOfSearchInput,
  creditsMovie,
  fetchLoading,
  fetchErrored,
  sentRequest,
  movies,
  movie
} from './movie';
import sessionState from './session';

export default combineReducers({
  transformdedCreditsMovie,
  valueOfSearchInput,
  creditsMovie,
  fetchLoading,
  fetchErrored,
  sentRequest,
  sessionState,
  movies,
  movie
});
