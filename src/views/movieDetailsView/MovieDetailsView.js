import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import axios from '../../utils/axios';
import DescriptionIcon from '@material-ui/icons/Description';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import './MovieDetailsView.css';
import Loader from '../../components/loader/Loader';
import { Button, Grow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMovie, deleteUserMovie } from '../../redux/userSlice';

function MovieDetailsView() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { user, favorites } = useSelector((state) => state.user);

  const checkIfFavorite = useCallback(() => {
    setFavorite(false);
    favorites.forEach((movie) => {
      if (movie.id.toString() === id) {
        setFavorite(true);
      }
    });
  }, [favorites, id]);

  const handleAddFavorite = () => {
    dispatch(
      addUserMovie({
        user: user,
        movieId: id,
      })
    );
  };

  const handleRemoveFavorite = () => {
    dispatch(
      deleteUserMovie({
        user: user,
        movieId: id,
      })
    );
  };

  useEffect(() => {
    console.log('useeffect');
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
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, checkIfFavorite]);

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
              <div className='movieDetail__poster'>
                {movieInfo.movie.poster_path ? (
                  <a href={movieInfo.movie.homepage}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movieInfo.movie.poster_path}`}
                      alt='Poster'
                    />
                  </a>
                ) : (
                  <div className='movieDetail__posterNotFound'>
                    <h3>{movieInfo.movie.title}</h3>
                  </div>
                )}
                {user && (
                  <div className='movieDetail__favorite'>
                    {favorite ? (
                      <>
                        <FavoriteIcon
                          style={{ color: '#e50914', marginRight: '10px' }}
                          fontSize='large'
                        />
                        <Button
                          disabled={loading ? true : false}
                          onClick={handleRemoveFavorite}
                          color='inherit'
                          style={{
                            flex: '1',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          Remove from Favorites
                        </Button>
                      </>
                    ) : (
                      <>
                        <FavoriteBorderIcon
                          style={{ color: '#e50914', marginRight: '10px' }}
                          fontSize='large'
                        />
                        <Button
                          disabled={loading ? true : false}
                          onClick={handleAddFavorite}
                          color='inherit'
                          style={{
                            flex: '1',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          Add to favorites
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
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
                  Release: <strong>{movieInfo.movie.release_date}</strong>
                </p>
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
