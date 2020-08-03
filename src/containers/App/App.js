// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MainContent from '../MainContent/MainContent';

import { withAuthentication } from '../../components/Session';

const App = () => (
  <ErrorBoundary>
    <Scrollbar
      trackYProps={{ className: 'scrollbar-main__trackY' }}
      thumbYProps={{ className: 'scrollbar-main__thumbY' }}
      className='scrollbar-main'
    >
      <Router>
        <div className='app'>
          <Header />
          <MainContent />
          <Footer />
        </div>
      </Router>
    </Scrollbar>
  </ErrorBoundary>
);

export default withAuthentication(App);
