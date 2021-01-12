import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import MovieList from '../../components/movie/MovieList';
import './FavoritesView.css';

function FavoritesView() {
  const { favorites } = useSelector((state) => state.user);
  return (
    <div className='favorites'>
      <Header />
      <div className='favorites__content'>
        <MovieList movies={favorites} pagination={false} />
      </div>
    </div>
  );
}

export default FavoritesView;
