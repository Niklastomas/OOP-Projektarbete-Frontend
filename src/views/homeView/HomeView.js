import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './HomeView.css';

import axios from '../../utils/axios';
import MovieList from '../../components/movie/MovieList';

// https://image.tmdb.org/t/p/w500

function HomeView() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('api/Movie/Popular/1');
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error.message);
        setError('No Records Found');
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  const handlePageChange = async (page) => {
    setLoading(true);
    try {
      setError('');
      const { data } = await axios.get(`api/Movie/Popular/${page}`);
      setMovies(data.results);
    } catch (error) {
      console.error(error.message);
      setError('No Records Found');
    }
    setLoading(false);
  };
  return (
    <div className='home'>
      <Header />
      <div className='home__content'>
        <MovieList
          movies={movies}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default HomeView;
