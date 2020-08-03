// @flow
import React, { useState, useEffect } from 'react';
import { slideInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import InputFirstPassword from '../InputFirstPassword/InputFirstPassword';
import RegistrationButton from '../RegistrationButton/RegistrationButton';
import InputEmail from '../InputEmail/InputEmail';
import SignInGoogle from '../SignInGoogle/SignInGoogle';
import SignInFacebook from '../SignInFacebook/SignInFacebook';

import { withFirebase } from '../Firebase';

const styles = {
  slideInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  }
};

const SignIn = ({ firebase, onCloseModal }) => {
  const [values, setValues] = useState({
    errorTextFilledInputs: '',
    errorTextPassword: '',
    firstPassword: '',
    email: '',
    errorFirebase: null,
    isGlowErrorPassword: false,
    isGlowErrorInput: false,
    formSubmitted: false
  });

  const setValueInput = (input, value) => {
    setValues({ ...values, [input]: value });
  };

  const setGlowErrorInput = bool => {
    setValues({ ...values, isGlowErrorInput: bool });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const inputEmailValue = event.target.email.value;
    const firstPasswordValue = event.target.firstPassword.value;

    const conditionEmptyInputs =
      inputEmailValue.length === 0 || firstPasswordValue.length === 0;

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

    if (!conditionEmptyInputs) {
      firebase
        .doSignInWithEmailAndPassword(inputEmailValue, firstPasswordValue)
        .then(() => {
          setValues({
            ...values,
            formSubmitted: true
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

  useEffect(() => {
    if (values.formSubmitted) {
      /*eslint-disable no-sequences*/
      return (values.email = ''), (values.firstPassword = ''), onCloseModal();
      /*eslint-enable no-sequences */
    }
  }, [values.formSubmitted, values.firstPassword, values.email, onCloseModal]);

  return (
    <StyleRoot>
      <div className='registration' style={styles.slideInUp}>
        <div className='registration__content'>
          <div className='registration__header'>
            <h2 className='registration__title-big'>Sign in</h2>
            <h3 className='registration__title-medium'>with</h3>
          </div>
          <div className='registration__additional-methods-enter'>
            <SignInGoogle onCloseModal={onCloseModal} />
            <SignInFacebook onCloseModal={onCloseModal} />
          </div>
          <div className='registration__subheader'>
            <h4 className='registration__title-small'>or</h4>
          </div>
          <form className='registration__form' onSubmit={handleSubmit}>
            <InputEmail
              setGlowErrorInput={setGlowErrorInput}
              setValueInput={setValueInput}
              value={values.email}
            />
            <InputFirstPassword
              setGlowErrorInput={setGlowErrorInput}
              setValueInput={setValueInput}
              value={values.firstPassword}
            />
            <RegistrationButton
              errorTextFilledInputs={values.errorTextFilledInputs}
              disabled={values.isGlowErrorInput}
              text='Sign In'
            />
          </form>
          {values.errorFirebase && (
            <p className='registration__error'>
              {values.errorFirebase.message}
            </p>
          )}
        </div>
      </div>
    </StyleRoot>
  );
};

export default withFirebase(SignIn);
