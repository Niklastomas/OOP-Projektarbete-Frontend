import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MoviePoster from '../../components/movie/MoviePoster';
import './HomeView.css';

import axios from '../../utils/axios';
import MovieList from '../../components/movie/MovieList';

// https://image.tmdb.org/t/p/w500

function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get('api/Movie/Popular');
      console.log(data.results);
      setMovies(data.results);
    };
    getMovies();
  }, []);
  return (
    <div className='home'>
      <Header />
      <MovieList movies={movies} />
      {/* <div className='home__content'>
        {movies &&
          movies.map((movie) => <MoviePoster poster={movie.poster_path} />)}
      </div> */}
    </div>
  );
}

export default HomeView;
