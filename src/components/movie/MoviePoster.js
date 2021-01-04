import { Fade } from '@material-ui/core';
import React from 'react';
import './MoviePoster.css';

function MoviePoster({ id, poster, title }) {
  return (
    <div className='moviePoster'>
      {poster ? (
        <Fade in={true} timeout={1000}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt='poster'
          ></img>
        </Fade>
      ) : (
        <div className='moviePoster__notFound'>
          <h3>{title}</h3>
        </div>
      )}
    </div>
  );
}

export default MoviePoster;
