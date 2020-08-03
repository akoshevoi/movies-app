// @flow
export const valueOfSearchInput = (state: string = '', action: Object) => {
  switch (action.type) {
    case 'TYPING_IN_SEARCH_MOVIE_INPUT':
      return action.valueOfSearchInput;
    default:
      return state;
  }
};

export const fetchLoading = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'RESPONSE_IS_LOADING':
      return action.fetchLoading;
    default:
      return state;
  }
};

export const fetchErrored = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'RESPONSE_HAS_ERRORED':
      return action.fetchFailure;
    default:
      return state;
  }
};

export const sentRequest = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'SENDING_REQUEST':
      return action.sentRequest;
    default:
      return state;
  }
};

export const movies = (state: Array<Object> = [], action: Object) => {
  switch (action.type) {
    case 'GET_MOVIES_ARRAY_FOR_RESULT_LIST':
      return action.movies;
    default:
      return state;
  }
};

export const movie = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case 'GET_SINGLE_MOVIE_FOR_PREVIEW_AND_EXPLICIT_INFO':
      return action.movie;
    default:
      return state;
  }
};

export const creditsMovie = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case 'GET_CREDITS_MOVIE':
      return action.credits;
    default:
      return state;
  }
};

export const transformdedCreditsMovie = (
  state: Array<Object> = [],
  action: Object
) => {
  switch (action.type) {
    case 'TRANSFORM_RECEIVED_CREDITS_MOVIE':
      return action.transformedCredits;
    default:
      return state;
  }
};
