import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import axios from "../../utils/axios";
import DescriptionIcon from "@material-ui/icons/Description";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";

import "./MovieDetailsView.css";
import Loader from "../../components/loader/Loader";
import { Button, Grow } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ShareModal from "../../components/modals/ShareModal";
import { addMovie, deleteMovie, getMovies } from "../../redux/movieSlice";
import { sendMessage } from "../../redux/messageSlice";
import { getFriends } from "../../redux/friendSlice";
import MovieTable from "../../components/table/MovieTable";

function MovieDetailsView() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { movies, status: movieStatus } = useSelector((state) => state.movie);
  const { friends, status: friendStatus } = useSelector(
    (state) => state.friend
  );

  const history = useHistory();

  const checkIfFavorite = useCallback(() => {
    setFavorite(false);
    movies?.forEach((movie) => {
      if (movie.id.toString() === id) {
        setFavorite(true);
      }
    });
  }, [movies, id]);

  const handleAddFavorite = () => {
    dispatch(addMovie(id));
  };

  const handleRemoveFavorite = () => {
    dispatch(deleteMovie(id));
  };

  const handleShare = async ({ friend, message }) => {
    dispatch(
      sendMessage({
        sentBy: user.username,
        sendTo: friend,
        movieId: id,
        message: message,
      })
    );
    setShowModal(false);
  };

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`api/Movie/MovieDetails/${id}`);
        setMovieInfo(data);
      } catch (error) {
        console.error(error.message);
        setError("No Record Found");
      }
      setLoading(false);
    };
    if (user) {
      dispatch(getMovies());
      dispatch(getFriends());
    }
    getMovie();
  }, [id, dispatch, user]);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, checkIfFavorite]);

  return (
    <div className="movieDetail">
      <Header />
      {showModal && (
        <ShareModal
          close={() => setShowModal(!showModal)}
          onSubmit={handleShare}
          friends={friends}
        />
      )}
      {loading || movieStatus === "loading" || friendStatus === "loading" ? (
        <Loader />
      ) : null}
      {error && <h1>{error}</h1>}
      {movieInfo.movie && (
        <div className="movieDetail__container">
          <Grow in={true} timeout={500}>
            <h1>{movieInfo.movie.title}</h1>
          </Grow>

          <div className="movieDetail__row">
            <Grow in={true} timeout={1000}>
              <div className="movieDetail__poster">
                {movieInfo.movie.poster_path ? (
                  <a href={movieInfo.movie.homepage}>
                    <img
                      onClick={() => history.push(movieInfo.movie.homepage)}
                      src={`https://image.tmdb.org/t/p/w500${movieInfo.movie.poster_path}`}
                      alt="Poster"
                    />
                  </a>
                ) : (
                  <div className="movieDetail__posterNotFound">
                    <h3>{movieInfo.movie.title}</h3>
                  </div>
                )}
                {user && (
                  <div className="movieDetail__favorite">
                    {favorite ? (
                      <>
                        <FavoriteIcon
                          style={{ color: "#e50914", marginRight: "10px" }}
                          fontSize="large"
                        />
                        <Button
                          disabled={loading ? true : false}
                          onClick={handleRemoveFavorite}
                          color="inherit"
                          style={{
                            flex: "1",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          Remove from Favorites
                        </Button>
                      </>
                    ) : (
                      <>
                        <FavoriteBorderIcon
                          style={{ color: "#e50914", marginRight: "10px" }}
                          fontSize="large"
                        />
                        <Button
                          disabled={loading ? true : false}
                          onClick={handleAddFavorite}
                          color="inherit"
                          style={{
                            flex: "1",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
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

            <div className="movieDetail__trailer">
              <Grow in={true} timeout={2500}>
                {movieInfo.trailer.results[0] ? (
                  <iframe
                    title="player"
                    className="player"
                    type="text/html"
                    src={`http://www.youtube.com/embed/${movieInfo.trailer.results[0].key}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="movieDetail__trailerNotFound">
                    <h3>No Trailer was found for this movie</h3>
                  </div>
                )}
              </Grow>
              {user && (
                <Grow in={true} timeout={2500}>
                  <div className="movieDetail__share">
                    <ShareIcon
                      fontSize="large"
                      style={{ marginRight: "10px" }}
                    />
                    <Button
                      disabled={loading ? true : false}
                      onClick={() => setShowModal(true)}
                      color="inherit"
                      style={{
                        flex: "1",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Share with a friend
                    </Button>
                  </div>
                </Grow>
              )}
            </div>
          </div>
          <Grow in={true} timeout={2000}>
            <div className="movieDetail__row">
              <div>
                <div className="movieDetail__title">
                  <DescriptionIcon />
                  <h3>Overview</h3>
                </div>

                <p>{movieInfo.movie.overview}</p>
              </div>
            </div>
          </Grow>
          <Grow in={true} timeout={2000}>
            <div className="movieDetail__row">
              <MovieTable
                release={movieInfo.movie.release_date}
                rating={movieInfo.movie.vote_average}
                votes={movieInfo.movie.vote_count}
                budget={movieInfo.movie.budget}
              />
            </div>
          </Grow>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsView;
