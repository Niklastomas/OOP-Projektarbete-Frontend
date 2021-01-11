import React from 'react';
import Header from '../../components/header/Header';
import LoginForm from '../../components/forms/LoginForm';
import './LoginView.css';
import { Link, Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeErrorMessage } from '../../redux/userSlice';
import Loader from '../../components/loader/Loader';

function LoginView() {
  const { user, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (user) => {
    dispatch(login(user));
  };

  const closeErrorMessage = () => {
    dispatch(removeErrorMessage());
  };

  return (
    <div className='login'>
      <Header />
      {user && <Redirect to='/' />}
      {loading && <Loader />}
      {error && (
        <Alert variant='filled' onClose={closeErrorMessage} severity='error'>
          {error}
        </Alert>
      )}
      <div className='login__form'>
        <LoginForm onSubmit={handleSubmit} />
        <span>
          Dont have an account? <Link to='/register'>Click here</Link>
        </span>
      </div>
    </div>
  );
}

export default LoginView;
