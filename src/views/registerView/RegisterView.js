import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import { removeErrorMessage } from '../../redux/userSlice';
import './RegisterView.css';

function RegisterView() {
  const { user, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (user) => {
    console.log('Hej');
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
