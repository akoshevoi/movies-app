// @flow
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const InputFirstPassword = ({
  setGlowErrorInput,
  setValueInput,
  value
}: Props) => {
  const classes = useStyles();
  /* eslint-disable max-len */
  const regExpPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/;
  /* eslint-enable max-len */

  const [values, setValues] = useState({
    valuePassword: '',
    showPassword: false,
    isGlowErrorPassword: false,
    errorTextPassword: ''
  });

  const handleChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
    setValueInput('firstPassword', target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const checkPassword = ({ target }) => {
    const value = target.value;
    const isValidValue = regExpPassword.test(value);

    if (value.length === 0) {
      setValues({
        ...values,
        isGlowErrorPassword: true,
        errorTextPassword: 'Please enter password'
      });
      setGlowErrorInput(true);
    } else if (!isValidValue) {
      setValues({
        ...values,
        isGlowErrorPassword: true,
        errorTextPassword: `Password must contain 7 characters, 
        at least one uppercase letter and one number.`
      });
      setGlowErrorInput(true);
    } else {
      setValues({
        ...values,
        isGlowErrorPassword: false,
        errorTextPassword: ''
      });
      setGlowErrorInput(false);
    }
  };

  return (
    <FormControl className={clsx(classes.formControl)} variant='outlined'>
      <InputLabel style={values.isGlowErrorPassword ? { color: 'red' } : null}>
        Enter password
      </InputLabel>
      <OutlinedInput
        name='firstPassword'
        onBlur={checkPassword}
        value={value}
        error={values.isGlowErrorPassword}
        onChange={handleChange('valuePassword')}
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment>
            <IconButton edge='end' onClick={handleClickShowPassword}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={110}
      />
      <FormHelperText style={{ color: 'red' }}>
        {values.errorTextPassword}
      </FormHelperText>
    </FormControl>
  );
};

export default InputFirstPassword;
