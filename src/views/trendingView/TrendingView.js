import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MovieList from '../../components/movie/MovieList';
import axios from '../../utils/axios';
import './TrendingView.css';

function TrendingView() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        setError('');
        const { data } = await axios.get('api/Movie/Trending');
        setMovies(data.results);
      } catch (error) {
        console.error(error.message);
        setError('No Records Found');
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <div className='trending'>
      <Header />
      <MovieList
        pagination={false}
        movies={movies}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default TrendingView;
