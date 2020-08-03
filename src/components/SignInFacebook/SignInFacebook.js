// @flow
import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import FacebookSvgIcon from '../../assets/icons/FacebookSvgIcon';

import { withFirebase } from '../Firebase';

const SignInFacebookBase = ({ firebase, authUser, onCloseModal }) => {
  const [values, setValues] = useState({
    error: null
  });

  const onSubmit = event => {
    event.preventDefault();

    firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        firebase.movies(socialAuthUser.user).on('value', data => {
          return firebase.user(socialAuthUser.user.uid).set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            provider: socialAuthUser.user.providerData[0].providerId,
            uid: socialAuthUser.user.uid,
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
      /*eslint-enable no-extra-boolean-cast*/
      return onCloseModal();
    }
  }, [authUser, onCloseModal]);

  return (
    <form onSubmit={onSubmit} className='sign-in-socials'>
      <button className='sign-in-socials__button' type='submit'>
        <FacebookSvgIcon />
      </button>
      {values.error && <p>{values.error.message}</p>}
    </form>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const SignInFacebook = compose(
  connect(mapStateToProps),
  withFirebase
)(SignInFacebookBase);

export default SignInFacebook;
