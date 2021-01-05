import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import MovieList from '../../components/movie/MovieList';
import axios from '../../utils/axios';

function SearchView() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { searchText } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`api/Movie/${searchText}/1`, config);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error.message);
        setError('No Records Found');
      }
      setLoading(false);
    };
    getMovies();
  }, [searchText, user.token]);

  const handlePageChange = async (page) => {
    try {
      setError('');
      const { data } = await axios.get(`api/Movie/${searchText}/${page}`);
      setMovies(data.results);
    } catch (error) {
      console.error(error.message);
      setError('No Records Found');
    }
  };
  return (
    <div className='popular'>
      <Header />
      <div className='popular__content'>
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

export default SearchView;
