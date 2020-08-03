// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

const useStyles = makeStyles({
  formControl: {
    margin: 10
  }
});

type Props = {
  setGlowErrorInput: Function,
  setValueInput: Function,
  value: string
};

const InputEmail = ({
  setGlowErrorInput,
  setValueInput,
  value
}: Props) => {
  const regExpEmail = /^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/;

  const classes = useStyles();

  const [values, setValues] = useState({
    valueInputEmail: '',
    isGlowErrorInputEmail: false,
    errorTextInputEmail: ''
  });

  const handleChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
    setValueInput('email', target.value);
  };

  const checkInputEmail = ({ target }) => {
    const value = target.value;
    const isValidValue = regExpEmail.test(value);

    if (value.length === 0) {
      setValues({
        ...values,
        isGlowErrorInputEmail: true,
        errorTextInputEmail: 'Please enter email'
      });
      setGlowErrorInput(true);
    } else if (!isValidValue) {
      setValues({
        ...values,
        isGlowErrorInputEmail: true,
        errorTextInputEmail: 'Email is invalid.Please enter correct email.'
      });
      setGlowErrorInput(true);
    } else {
      setValues({
        ...values,
        isGlowErrorInputEmail: false,
        errorTextInputEmail: ''
      });
      setGlowErrorInput(false);
    }
  };

  return (
    <TextField
      name='email'
      type='email'
      variant='outlined'
      label='Enter email'
      onBlur={checkInputEmail}
      value={value}
      error={values.isGlowErrorInputEmail}
      className={clsx(classes.formControl)}
      onChange={handleChange('valueInputEmail')}
      helperText={values.errorTextInputEmail}
    />
  );
};

export default InputEmail;
