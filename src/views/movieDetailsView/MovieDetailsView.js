import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import axios from '../../utils/axios';
import DescriptionIcon from '@material-ui/icons/Description';

import './MovieDetailsView.css';
import Loader from '../../components/loader/Loader';
import { Grow } from '@material-ui/core';

function MovieDetailsView() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`api/Movie/MovieDetails/${id}`);
        setMovieInfo(data);
      } catch (error) {
        console.error(error.message);
        setError('No Record Found');
      }
      setLoading(false);
    };
    getMovie();
  }, [id]);
  return (
    <div className='movieDetail'>
      <Header />
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {movieInfo.movie && (
        <div className='movieDetail__container'>
          <Grow in={true} timeout={500}>
            <h1>{movieInfo.movie.title}</h1>
          </Grow>

          <div className='movieDetail__row'>
            <Grow in={true} timeout={1000}>
              <a href={movieInfo.movie.homepage}>
                <div className='movieDetail__poster'>
                  {movieInfo.movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movieInfo.movie.poster_path}`}
                      alt='Poster'
                    />
                  ) : (
                    <div className='movieDetail__posterNotFound'>
                      <h3>{movieInfo.movie.title}</h3>
                    </div>
                  )}

                  <p>
                    Release: <strong>{movieInfo.movie.release_date}</strong>
                  </p>
                </div>
              </a>
            </Grow>

            <div className='movieDetail__trailer'>
              <Grow in={true} timeout={2500}>
                {movieInfo.trailer.results[0] ? (
                  <iframe
                    title='player'
                    className='player'
                    type='text/html'
                    src={`http://www.youtube.com/embed/${movieInfo.trailer.results[0].key}`}
                    frameBorder='0'
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className='movieDetail__trailerNotFound'>
                    <h3>No Trailer was found for this movie</h3>
                  </div>
                )}
              </Grow>
              <div className='movieDetail__info'>
                <p>
                  Rating: <strong>{movieInfo.movie.vote_average}</strong>
                </p>
                <p>
                  Votes: <strong>{movieInfo.movie.vote_count}</strong>
                </p>
                {movieInfo.movie.budget !== 0 && (
                  <p>
                    Budget: <strong>${movieInfo.movie.budget}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='movieDetail__row'>
            <Grow in={true} timeout={2000}>
              <div>
                <div className='movieDetail__title'>
                  <DescriptionIcon />
                  <h3>Overview</h3>
                </div>

                <p>{movieInfo.movie.overview}</p>
              </div>
            </Grow>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsView;
