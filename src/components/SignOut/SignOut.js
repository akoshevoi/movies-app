// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  getMoviesArrayForResultList,
  getSingleMovieForPreviewAndExplicitInfo,
  typingInSearchMovieInput
} from '../../actions/actions';
import { compose } from 'recompose';
import ExitSvgIcon from '../../assets/icons/ExitSvgIcon';

import { withFirebase } from '../Firebase';

const SignOut = ({
  getSingleMovieForPreviewAndExplicitInfo,
  getMoviesArrayForResultList,
  typingInSearchMovieInput,
  firebase,
  authUser
}) => {
  const doSignOut = () => {
    firebase.doSignOut();
    typingInSearchMovieInput('');
    getMoviesArrayForResultList([]);
    getSingleMovieForPreviewAndExplicitInfo({});
  };

  return (
    <div className='header__exit' onClick={doSignOut} title='Log out'>
      {authUser && <ExitSvgIcon />}
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  getMoviesArrayForResultList: array =>
    dispatch(getMoviesArrayForResultList(array)),
  getSingleMovieForPreviewAndExplicitInfo: movie =>
    dispatch(getSingleMovieForPreviewAndExplicitInfo(movie)),
  typingInSearchMovieInput: text => dispatch(typingInSearchMovieInput(text))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(SignOut);
