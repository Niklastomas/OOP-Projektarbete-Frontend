import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from ".././utils/axios";

export const getMovies = createAsyncThunk("Movies/Get", async () => {
  const { data } = await axios.get("/api/User/GetMovies");
  return data;
});

export const addMovie = createAsyncThunk("Movies/Post", async (movieId) => {
  const { data } = await axios.post(`/api/User/AddMovie/${movieId}`);
  return data;
});

export const deleteMovie = createAsyncThunk(
  "Movies/Delete",
  async (movieId) => {
    const { data } = await axios.delete(`/api/User/DeleteMovie/${movieId}`);
    return data;
  }
);

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.status = "loading";
    },
    [getMovies.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.movies = action.payload;
    },
    [getMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addMovie.pending]: (state) => {
      state.status = "loading";
    },
    [addMovie.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.movies.push(action.payload);
    },
    [addMovie.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteMovie.pending]: (state) => {
      state.status = "loading";
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    [deleteMovie.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default movieSlice.reducer;
