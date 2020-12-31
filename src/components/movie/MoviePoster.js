import { Fade } from '@material-ui/core';
import React from 'react';
import './MoviePoster.css';

function MoviePoster({ id, poster }) {
  return (
    <div className='moviePoster'>
      <Fade in={true} timeout={1000}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt='poster'
        ></img>
      </Fade>
    </div>
  );
}

export default MoviePoster;
