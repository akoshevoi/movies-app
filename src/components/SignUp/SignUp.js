// @flow
import React, { useState, useEffect } from 'react';
import { slideInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import InputConfirmPassword from '../InputConfirmPassword/InputConfirmPassword';
import InputFirstPassword from '../InputFirstPassword/InputFirstPassword';
import RegistrationButton from '../RegistrationButton/RegistrationButton';
import InputEmail from '../InputEmail/InputEmail';
import InputName from '../InputName/InputName';
import SignInGoogle from '../SignInGoogle/SignInGoogle';
import SignInFacebook from '../SignInFacebook/SignInFacebook';

import { withFirebase } from '../Firebase';

const styles = {
  slideInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
  }
};

const SignUp = ({ firebase, onCloseModal }) => {
  const [values, setValues] = useState({
    errorTextFilledInputs: '',
    errorTextPassword: '',
    confirmPassword: '',
    firstPassword: '',
    username: '',
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

    const inputNameValue = event.target.username.value;
    const inputEmailValue = event.target.email.value;
    const firstPasswordValue = event.target.firstPassword.value;
    const confirmPasswordValue = event.target.confirmPassword.value;

    const conditionEmptyInputs =
      inputNameValue.length === 0 ||
      inputEmailValue.length === 0 ||
      firstPasswordValue.length === 0 ||
      confirmPasswordValue.length === 0;

    const conditionNonEqualPasswords =
      firstPasswordValue.length > 0 &&
      confirmPasswordValue.length > 0 &&
      firstPasswordValue !== confirmPasswordValue;

    const conditionEqualPasswords =
      inputNameValue.length > 0 &&
      inputEmailValue.length > 0 &&
      firstPasswordValue.length > 0 &&
      confirmPasswordValue.length > 0 &&
      firstPasswordValue === confirmPasswordValue;

    const conditionSubmitForm =
      conditionEqualPasswords && confirmPasswordValue.length > 0;

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

    if (conditionNonEqualPasswords) {
      setValues({
        ...values,
        isGlowErrorPassword: true,
        errorTextPassword: 'Passwords not equal'
      });
    } else if (conditionEqualPasswords) {
      setValues({
        ...values,
        isGlowErrorPassword: false,
        errorTextPassword: ''
      });
    }

    if (conditionSubmitForm) {
      firebase
        .doCreateUserWithEmailAndPassword(inputEmailValue, firstPasswordValue)
        .then(authUser => {
          return firebase.user(authUser.user.uid).set({
            username: inputNameValue,
            email: inputEmailValue,
            provider: authUser.additionalUserInfo.providerId
          });
        })
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
      return (
        (values.username = ''),
        (values.email = ''),
        (values.firstPassword = ''),
        (values.confirmPassword = ''),
        onCloseModal()
      );
    }
  }, [
    values.confirmPassword,
    values.formSubmitted,
    values.firstPassword,
    values.username,
    values.email,
    onCloseModal
  ]);

  return (
    <StyleRoot>
      <div className='registration' style={styles.slideInDown}>
        <div className='registration__content'>
          <div className='registration__header'>
            <h2 className='registration__title-big'>Sign up</h2>
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
            <InputName
              setGlowErrorInput={setGlowErrorInput}
              setValueInput={setValueInput}
              value={values.username}
            />
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
            <InputConfirmPassword
              isGlowErrorPassword={values.isGlowErrorPassword}
              errorTextPassword={values.errorTextPassword}
              setValueInput={setValueInput}
              value={values.confirmPassword}
            />
            <RegistrationButton
              errorTextFilledInputs={values.errorTextFilledInputs}
              disabled={values.isGlowErrorInput}
              text='Sign Up'
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


export default withFirebase(SignUp);
