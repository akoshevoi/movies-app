// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MainContent from '../MainContent/MainContent';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

import { withAuthentication } from '../../components/Session';

const App = () => (
  <ErrorBoundary>
    <Router>
      <div className='app'>
        <Header />
        <Scrollbar
          trackYProps={{ className: 'scrollbar-main__trackY' }}
          thumbYProps={{ className: 'scrollbar-main__thumbY' }}
          className='scrollbar-main'
        >
          <MainContent />
        </Scrollbar>
        <BottomNavBar />
        <Footer />
      </div>
    </Router>
  </ErrorBoundary>
);

export default withAuthentication(App);
