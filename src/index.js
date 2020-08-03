// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import { configureStore } from './store/configureStore';
import Firebase, { FirebaseContext } from './components/Firebase';

import './assets/sass/style.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);
