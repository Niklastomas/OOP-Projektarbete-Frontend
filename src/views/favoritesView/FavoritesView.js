import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/Header";
import MovieList from "../../components/movie/MovieList";
import { getMovies } from "../../redux/movieSlice";
import "./FavoritesView.css";

function FavoritesView() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className="favorites">
      <Header />
      <div className="favorites__content">
        <MovieList movies={movies} pagination={false} />
      </div>
    </div>
  );
}

export default FavoritesView;
