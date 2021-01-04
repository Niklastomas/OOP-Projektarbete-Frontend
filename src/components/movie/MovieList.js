import React from 'react';
import MoviePoster from './MoviePoster';
import './MovieList.css';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import Loader from '../loader/Loader';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& .Mui-selected': {
      backgroundColor: '#E50914',
    },
  },
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
});

function MovieList({
  movies,
  onPageChange,
  totalPages,
  error,
  loading,
  pagination = true,
}) {
  const classes = useStyles();

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
              <MoviePoster poster={movie.poster_path} title={movie.title} />
            </Link>
          ))
        )}
      </div>
      {pagination && (
        <Pagination
          onChange={handleChange}
          classes={classes}
          variant='outlined'
          // color='secondary'
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
