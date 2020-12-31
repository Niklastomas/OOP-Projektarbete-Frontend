import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import axios from '../../utils/axios';
import DescriptionIcon from '@material-ui/icons/Description';

import './MovieDetailsView.css';

function MovieDetailsView() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(`api/Movie/MovieDetails/${id}`);
      setMovieInfo(data);
      console.log(data);
    };
    getMovie();
  }, [id]);
  return (
    <div className='movieDetail'>
      <Header />
      {movieInfo.movie && (
        <div className='movieDetail__container'>
          <h1>{movieInfo.movie.title}</h1>

          <div className='movieDetail__row'>
            <a href={movieInfo.movie.homepage}>
              <div className='movieDetail__poster'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieInfo.movie.poster_path}`}
                  alt='Poster'
                />

                <p>
                  Release: <strong>{movieInfo.movie.release_date}</strong>
                </p>
              </div>
            </a>

            <div className='movieDetail__trailer'>
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
            <div>
              <div className='movieDetail__title'>
                <DescriptionIcon />
                <h3>Overview</h3>
              </div>

              <p>{movieInfo.movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsView;
