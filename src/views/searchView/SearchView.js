import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log(searchText);
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`api/Movie/${searchText}/1`);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error.message);
        setError('No Records Found');
      }
      setLoading(false);
    };
    getMovies();
  }, [searchText]);

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
