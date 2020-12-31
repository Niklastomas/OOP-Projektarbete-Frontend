import React from 'react';
import MoviePoster from './MoviePoster';
import './MovieList.css';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import Loader from '../loader/Loader';

function MovieList({
  movies,
  onPageChange,
  totalPages,
  error,
  loading,
  pagination = true,
}) {
  const handleChange = (event, value) => {
    onPageChange(value);
  };
  return (
    <div className='movieList'>
      <div className='movieList__movies'>
        {loading && <Loader />}
        {error ? (
          <h1>{error}</h1>
        ) : (
          movies?.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MoviePoster poster={movie.poster_path} />
            </Link>
          ))
        )}
      </div>
      {pagination && (
        <Pagination
          onChange={handleChange}
          color='secondary'
          style={{
            margin: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
          count={totalPages}
        />
      )}
    </div>
  );
}

export default MovieList;
