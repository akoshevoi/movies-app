// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import InputFirstPassword from '../InputFirstPassword/InputFirstPassword';
import InputConfirmPassword from '../InputConfirmPassword/InputConfirmPassword';
import RegistrationButton from '../RegistrationButton/RegistrationButton';

import { withAuthorization } from '../Session';

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
};

const Account = ({ authUser, firebase }) => {
  const [values, setValues] = useState({
    errorTextFilledInputs: '',
    errorTextPassword: '',
    confirmPassword: '',
    firstPassword: '',
    errorFirebase: null,
    isGlowErrorPassword: false,
    isGlowErrorInput: false
  });

  const setValueInput = (input, value) => {
    setValues({ ...values, [input]: value });
  };

  const setGlowErrorInput = bool => {
    setValues({ ...values, isGlowErrorInput: bool });
  };

  const onSubmit = event => {
    event.preventDefault();

    const firstPasswordValue = event.target.firstPassword.value;
    const confirmPasswordValue = event.target.confirmPassword.value;

    const conditionNonEqualPasswords =
      firstPasswordValue !== confirmPasswordValue;

    const conditionEqualPasswords = firstPasswordValue === confirmPasswordValue;

    const conditionEmptyInputs =
      confirmPasswordValue.length === 0 || firstPasswordValue.length === 0;

    const conditionSubmitForm =
      !conditionNonEqualPasswords &&
      conditionEqualPasswords &&
      !conditionEmptyInputs;

    if (conditionNonEqualPasswords) {
      setValues({
        ...values,
        isGlowErrorPassword: true,
        errorTextPassword: 'Passwords not equal'
      });
    } else {
      setValues({
        ...values,
        isGlowErrorPassword: false,
        errorTextPassword: ''
      });
    }

    if (conditionEmptyInputs) {
      setValues({
        ...values,
        errorTextFilledInputs: 'Please fill in the input fields'
      });
    } else {
      setValues({
        ...values,
        errorTextFilledInputs: ''
      });
    }

    if (conditionSubmitForm) {
      firebase
        .doPasswordUpdate(values.firstPassword)
        .then(() => {
          setValues({
            ...values,
            confirmPassword: '',
            firstPassword: ''
          });
        })
        .catch(error => {
          setValues({
            ...values,
            errorFirebase: error
          });
        });
    }
  };

  return (
    <StyleRoot>
      <div className='account'>
        <div className='account__info'>
          <h3 className='account__title'>User Info</h3>
          <div className='account__list'>
            {(authUser.username || authUser.provider) && (
              <div className='account__item'>
                <p className='account__definition'>Username:</p>
                <p className='account__meaning'>
                  {authUser.username}
                  {authUser.provider[0].displayName}
                </p>
              </div>
            )}
            {authUser.email !== null && (
              <div className='account__item'>
                <p className='account__definition'>Email:</p>
                <p className='account__meaning'>
                  {authUser.email}
                  {authUser.provider[0].email}
                </p>
              </div>
            )}
            {authUser.provider && (
              <div className='account__item'>
                <p className='account__definition'>You sign up with:</p>
                <p className='account__meaning'>
                  {typeof authUser.provider === 'string'
                    ? authUser.provider
                    : authUser.provider[0].providerId}
                </p>
              </div>
            )}
          </div>
        </div>
        {authUser.provider === 'password' && (
          <div className='password-change' style={styles.fadeIn}>
            <div className='password-change__header'>
              <h2 className='password-change__title-big'>
                Do you want to change your password?
              </h2>
              <h3 className='password-change__title-small'>Let's do it!</h3>
            </div>
            <form className='password-change__form' onSubmit={onSubmit}>
              <InputFirstPassword
                setGlowErrorInput={setGlowErrorInput}
                setValueInput={setValueInput}
                value={values.firstPassword}
              />
              <InputConfirmPassword
                isGlowErrorPassword={values.isGlowErrorPassword}
                errorTextPassword={values.errorTextPassword}
                setValueInput={setValueInput}
                value={values.confirmPassword}
              />
              <RegistrationButton
                errorTextFilledInputs={values.errorTextFilledInputs}
                disabled={values.isGlowErrorInput}
                text='Change Password'
              />
            </form>
            {values.errorFirebase && (
              <p className='password-change__error'>
                {values.errorFirebase.message}
              </p>
            )}
          </div>
        )}
      </div>
    </StyleRoot>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(Account);
