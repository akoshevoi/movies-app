// @flow
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export const configureStore = (initialState: Object) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
