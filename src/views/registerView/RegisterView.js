import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import { register, removeErrorMessage } from '../../redux/userSlice';
import './RegisterView.css';

function RegisterView() {
  const { user, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (user) => {
    if (user.password === user.confirmPassword) {
      if (user.password.length >= 6) {
        dispatch(register(user));
      } else {
        alert('Password must contain atleat 6 characters');
      }
    } else {
      alert('password does not match');
    }
  };

  const closeErrorMessage = () => {
    dispatch(removeErrorMessage());
  };

  return (
    <div className='register'>
      <Header />
      {user && <Redirect to='/' />}
      {loading && <Loader />}
      {error && (
        <Alert variant='filled' onClose={closeErrorMessage} severity='error'>
          {error}
        </Alert>
      )}
      <div className='register__form'>
        <RegisterForm onSubmit={handleSubmit} />
        <span>
          Already have an account? <Link to='/login'>Click here</Link>
        </span>
      </div>
    </div>
  );
}

export default RegisterView;
