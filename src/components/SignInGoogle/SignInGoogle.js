// @flow
import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import GoogleSvgIcon from '../../assets/icons/GoogleSvgIcon';

import { withFirebase } from '../Firebase';

const SignInGoogleBase = ({ firebase, authUser, onCloseModal }) => {
  const [values, setValues] = useState({
    error: null
  });

  const onSubmit = event => {
    event.preventDefault();

    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        firebase.movies(socialAuthUser.user).on('value', data => {
          return firebase.user(socialAuthUser.user.uid).set({
            uid: socialAuthUser.user.uid,
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            provider: socialAuthUser.user.providerData[0].providerId,
            favouritesMovies: data.val() ? data.val() : null
          });
        });
      })
      .then(() => {
        setValues({
          ...values,
          error: null
        });
      })
      .catch(() => {
        setValues({
          ...values,
          error: null
        });
      });
  };

  useEffect(() => {
    /*eslint-disable no-extra-boolean-cast*/
    if (authUser) {
      /*eslint-able no-extra-boolean-cast*/
      return onCloseModal();
    }
  }, [authUser, onCloseModal]);

  return (
    <form onSubmit={onSubmit} className='sign-in-socials'>
      <button className='sign-in-socials__button' type='submit'>
        <GoogleSvgIcon />
      </button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const SignInGoogle = compose(
  connect(mapStateToProps),
  withFirebase
)(SignInGoogleBase);

export default SignInGoogle;
