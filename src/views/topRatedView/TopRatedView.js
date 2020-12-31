import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MovieList from '../../components/movie/MovieList';
import axios from '../../utils/axios';
import './TopRatedView.css';

function TopRatedView() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('api/Movie/Toprated/1');
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
      const { data } = await axios.get(`api/Movie/Toprated/${page}`);
      setMovies(data.results);
    } catch (error) {
      console.error(error.message);
      setError('No Records Found');
    }
    setLoading(false);
  };
  return (
    <div className='toprated'>
      <Header />
      <div className='toprated__content'>
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

export default TopRatedView;
