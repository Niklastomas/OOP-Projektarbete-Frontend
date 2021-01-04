import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import './RegisterForm.css';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#e50914',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e50914',
    },
    '& .MuiInput-input': {
      color: 'white',
      padding: '10px 0',
    },
    '& .MuiInput-formControl': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
  },
});

function RegisterForm({ onSubmit }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleShowPassword = (e) => {
    const { name } = e.target;

    setShowPassword((prevValue) => {
      return {
        ...prevValue,
        [name]: true,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    console.log('submit');
  };
  return (
    <form onSubmit={handleSubmit} className='registerForm'>
      <FormControl classes={classes} style={{ width: '250px' }}>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <Input
          required
          id='email'
          type='email'
          value={input.email}
          name='email'
          onChange={handleChange}
        />
      </FormControl>
      <FormControl classes={classes} style={{ width: '250px' }}>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <Input
          required
          id='password'
          type={showPassword ? 'text' : 'password'}
          value={input.password}
          name='password'
          onChange={handleChange}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Visibility style={{ color: 'white' }} />
                ) : (
                  <VisibilityOff style={{ color: 'white' }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl classes={classes} style={{ width: '250px' }}>
        <InputLabel htmlFor='comfirm-password'>Confirm Password</InputLabel>
        <Input
          required
          id='confirm-password'
          type={showConfirmPassword ? 'text' : 'password'}
          value={input.confirmPassword}
          name='confirmPassword'
          onChange={handleChange}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Visibility style={{ color: 'white' }} />
                ) : (
                  <VisibilityOff style={{ color: 'white' }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        type='submit'
        style={{
          backgroundColor: '#e50914',
          color: 'white',
          margin: '10px 0',
          width: '250px',
        }}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
