// @flow
import React, { useState } from 'react';
import { slideInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import RegistrationButton from '../RegistrationButton/RegistrationButton';
import InputEmail from '../InputEmail/InputEmail';

import { withFirebase } from '../Firebase';

const styles = {
  slideInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  }
};

const PasswordForget = ({ firebase }) => {
  const [values, setValues] = useState({
    errorTextFilledInputs: '',
    email: '',
    errorFirebase: null,
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

    const inputEmailValue = event.target.email.value;

    const conditionEmptyInputs = inputEmailValue.length === 0;

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

    firebase
      .doPasswordReset(values.email)
      .then(() => {
        setValues({
          ...values,
          email: ''
        });
      })
      .catch(error => {
        setValues({
          ...values,
          errorFirebase: error
        });
      });
  };

  return (
    <StyleRoot>
      <div className='password-forget' style={styles.slideInUp}>
        <div className='password-forget__header'>
          <h2 className='password-forget__title-big'>Forgot Password?</h2>
          <h3 className='password-forget__title-medium'>Don't worry</h3>
          <h3 className='password-forget__title-small'>
            Just enter email and follow received instructions
          </h3>
        </div>
        <form className='password-forget__form' onSubmit={onSubmit}>
          <InputEmail
            setGlowErrorInput={setGlowErrorInput}
            setValueInput={setValueInput}
            value={values.email}
          />
          <RegistrationButton
            errorTextFilledInputs={values.errorTextFilledInputs}
            disabled={values.isGlowErrorInput}
            text='Reset Password'
          />
        </form>
      </div>
    </StyleRoot>
  );
};

export default withFirebase(PasswordForget);
