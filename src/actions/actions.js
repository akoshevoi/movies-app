// @flow
import axios from 'axios';
import { fitCreditsMovie } from '../utils/helpers';

type TypingInSearchMovieInput = {
  type: 'TYPING_IN_SEARCH_MOVIE_INPUT',
  valueOfSearchInput: string
};

type ResponseIsLoading = {
  type: 'RESPONSE_IS_LOADING',
  fetchLoading: boolean
};

type ResponseHasErrored = {
  type: 'RESPONSE_HAS_ERRORED',
  fetchFailure: boolean
};

type SendingRequest = {
  type: 'SENDING_REQUEST',
  sentRequest: boolean
};

type GetMoviesArrayForResultList = {
  type: 'GET_MOVIES_ARRAY_FOR_RESULT_LIST',
  movies: Array<Object>
};

type GetSingleMovieForPreviewAndExplicitInfo = {
  type: 'GET_SINGLE_MOVIE_FOR_PREVIEW_AND_EXPLICIT_INFO',
  movie: Object
};

type GetCreditsMovie = {
  type: 'GET_CREDITS_MOVIE',
  credits: Object
};

type TransformReceivedCreditsMovie = {
  type: 'TRANSFORM_RECEIVED_CREDITS_MOVIE',
  transformedCredits: Array<Object>
};

type Action =
  | TypingInSearchMovieInput
  | ResponseIsLoading
  | ResponseHasErrored
  | SendingRequest
  | GetMoviesArrayForResultList
  | GetSingleMovieForPreviewAndExplicitInfo
  | GetCreditsMovie
  | TransformReceivedCreditsMovie;

type PromiseAction = Promise<Action>;
type Dispatch = (
  action: Action | PromiseAction | Array<Action> | ((dispatch: Dispatch) => any)
) => any;
type ThunkAction = (dispatch: Dispatch) => any;

export const typingInSearchMovieInput = (
  value: string
): TypingInSearchMovieInput => ({
  type: 'TYPING_IN_SEARCH_MOVIE_INPUT',
  valueOfSearchInput: value
});

export const responseIsLoading = (bool: boolean): ResponseIsLoading => ({
  type: 'RESPONSE_IS_LOADING',
  fetchLoading: bool
});

export const responseHasErrored = (bool: boolean): ResponseHasErrored => ({
  type: 'RESPONSE_HAS_ERRORED',
  fetchFailure: bool
});

export const sendingRequest = (bool: boolean): SendingRequest => ({
  type: 'SENDING_REQUEST',
  sentRequest: bool
});

export const getMoviesArrayForResultList = (
  movies: Array<Object>
): GetMoviesArrayForResultList => ({
  type: 'GET_MOVIES_ARRAY_FOR_RESULT_LIST',
  movies
});

export const getSingleMovieForPreviewAndExplicitInfo = (
  movie: Object
): GetSingleMovieForPreviewAndExplicitInfo => ({
  type: 'GET_SINGLE_MOVIE_FOR_PREVIEW_AND_EXPLICIT_INFO',
  movie
});

export const getCreditsMovie = (credits: Object): GetCreditsMovie => ({
  type: 'GET_CREDITS_MOVIE',
  credits
});

export const transformReceivedCreditsMovie = (
  credits: Array<Object>
): TransformReceivedCreditsMovie => ({
  type: 'TRANSFORM_RECEIVED_CREDITS_MOVIE',
  transformedCredits: fitCreditsMovie(credits, 'name', 'job')
});

export const fetchBriefDataMovies = (url: string): ThunkAction => {
  return dispatch => {
    dispatch(responseIsLoading(true));
    dispatch(getMoviesArrayForResultList([]));
    dispatch(getSingleMovieForPreviewAndExplicitInfo({}));

    axios(url)
      .then(response => {
        setTimeout(() => {
          dispatch(getMoviesArrayForResultList(response.data.results));
          dispatch(responseIsLoading(false));
        }, 500);
      })
      .catch(() => {
        dispatch(responseIsLoading(false));
        dispatch(responseHasErrored(true));
      });
  };
};

export const fetchExtendedDataSpecificMovie = (url: string): ThunkAction => {
  return dispatch => {
    dispatch(responseIsLoading(true));

    axios(url)
      .then(response => {
        setTimeout(() => {
          dispatch(getSingleMovieForPreviewAndExplicitInfo(response.data));
          dispatch(responseIsLoading(false));
        }, 500);
      })
      .catch(() => {
        dispatch(responseIsLoading(false));
        dispatch(responseHasErrored(true));
      });
    dispatch(typingInSearchMovieInput(''));
    dispatch(getMoviesArrayForResultList([]));
  };
};

export const fetchCreditsMovie = (url: string): ThunkAction => {
  return dispatch => {
    dispatch(responseIsLoading(true));

    axios(url)
      .then(response => {
        setTimeout(() => {
          dispatch(getCreditsMovie(response.data));
          dispatch(responseIsLoading(false));
        }, 500);
      })
      .catch(() => {
        dispatch(responseIsLoading(false));
        dispatch(responseHasErrored(true));
      });
  };
};
