// @flow
import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  button: {
    alignSelf: 'center',
    margin: 10
  },
  helperText: {
    color: 'red',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});

type Props = {
  errorTextFilledInputs: string,
  disabled: boolean,
  text: string
};

const RegistrationButton = ({
  errorTextFilledInputs,
  disabled,
  text
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl>
      <Button
        type='submit'
        color='primary'
        variant='contained'
        disabled={disabled}
        className={clsx(classes.button)}
      >
        {text}
      </Button>
      <FormHelperText className={clsx(classes.helperText)}>
        {errorTextFilledInputs}
      </FormHelperText>
    </FormControl>
  );
};

export default RegistrationButton;
