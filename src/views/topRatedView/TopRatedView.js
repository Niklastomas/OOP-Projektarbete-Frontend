import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MovieList from '../../components/movie/MovieList';
import axios from '../../utils/axios';
import './TopRatedView.css';

function TopRatedView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get('api/Movie/TopRated');
      console.log(data.results);
      setMovies(data.results);
    };
    getMovies();
  }, []);
  return (
    <div className='home'>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
}

export default TopRatedView;
