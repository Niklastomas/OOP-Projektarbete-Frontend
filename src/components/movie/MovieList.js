import React from 'react';
import MoviePoster from './MoviePoster';
import './MovieList.css';

function MovieList({ movies }) {
  return (
    <div className='movieList'>
      <div className='movieList__movies'>
        {movies?.map((movie) => (
          <MoviePoster key={movie.id} poster={movie.poster_path} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
