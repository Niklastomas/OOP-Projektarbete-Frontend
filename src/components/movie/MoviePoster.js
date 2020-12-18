import React from 'react';
import './MoviePoster.css';

function MoviePoster({ id, poster }) {
  return (
    <img
      className='moviePoster'
      src={`https://image.tmdb.org/t/p/w500${poster}`}
      alt='poster'
    ></img>
  );
}

export default MoviePoster;
