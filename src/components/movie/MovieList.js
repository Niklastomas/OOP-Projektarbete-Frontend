import React from 'react';
import MoviePoster from './MoviePoster';
import './MovieList.css';
import { Link } from 'react-router-dom';

function MovieList({ movies }) {
  return (
    <div className='movieList'>
      <div className='movieList__movies'>
        {movies?.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MoviePoster poster={movie.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
