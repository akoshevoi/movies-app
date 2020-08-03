// @flow
import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';

const useStyles = makeStyles({
  formControl: {
    margin: 10
  }
});

type Props = {
  isGlowErrorPassword: boolean,
  errorTextPassword: string,
  setValueInput: Function,
  value: string
};

const InputConfirmPassword = ({
  isGlowErrorPassword,
  errorTextPassword,
  setValueInput,
  value
}: Props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    valuePassword: '',
    showPassword: false
  });

  const handleChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
    setValueInput('confirmPassword', target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <FormControl className={clsx(classes.formControl)} variant='outlined'>
      <InputLabel style={isGlowErrorPassword ? { color: 'red' } : null}>
        Confirm password
      </InputLabel>
      <OutlinedInput
        name='confirmPassword'
        error={isGlowErrorPassword}
        value={value}
        onChange={handleChange('valuePassword')}
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment>
            <IconButton edge='end' onClick={handleClickShowPassword}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={130}
      />
      <FormHelperText style={{ color: 'red' }}>
        {errorTextPassword}
      </FormHelperText>
    </FormControl>
  );
};

export default InputConfirmPassword;
