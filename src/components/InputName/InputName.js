// @flow
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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

const InputName = ({
  setGlowErrorInput,
  setValueInput,
  value
}: Props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    valueInputName: '',
    isGlowErrorInputName: false,
    errorTextInputName: ''
  });

  const handleChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
    setValueInput('username', target.value);
  };

  const checkInputName = ({ target }) => {
    const value = target.value;

    if (value.length === 0) {
      setValues({
        ...values,
        isGlowErrorInputName: true,
        errorTextInputName: 'Please enter name'
      });
      setGlowErrorInput(true);
    } else {
      setValues({
        ...values,
        isGlowErrorInputName: false,
        errorTextInputName: ''
      });
      setGlowErrorInput(false);
    }
  };

  return (
    <TextField
      name='username'
      variant='outlined'
      label='Enter name'
      onBlur={checkInputName}
      value={value}
      error={values.isGlowErrorInputName}
      className={clsx(classes.formControl)}
      onChange={handleChange('valueInputName')}
      helperText={values.errorTextInputName}
    />
  );
};

export default InputName;
