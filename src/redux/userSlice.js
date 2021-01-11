import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
const favoriteMoviesFromSessionStorage = JSON.parse(
  sessionStorage.getItem('favoriteMovies')
);

const initialState = {
  user: userFromSessionStorage,
  favorites: favoriteMoviesFromSessionStorage,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('Account/Login', async (user) => {
  const { data: userData } = await axios.post('/api/Account/Login', user);

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };
  const { data: userMovies } = await axios.get('/api/User/GetMovies', config);

  sessionStorage.setItem('user', JSON.stringify(userData));
  sessionStorage.setItem('favoriteMovies', JSON.stringify(userMovies));

  return {
    user: userData,
    movies: userMovies,
  };
});

export const register = createAsyncThunk('Account/Create', async (user) => {
  const { data } = await axios.post('/api/Account/Create', user);
  sessionStorage.setItem('user', JSON.stringify(data));
  return data;
});

export const deleteUserMovie = createAsyncThunk(
  'User/Movies/Delete',
  async (info) => {
    const config = {
      headers: {
        Authorization: `Bearer ${info.user.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/User/DeleteMovie/${info.movieId}`,
      config
    );
    return data;
  }
);

export const addUserMovie = createAsyncThunk(
  'User/Movies/Add',
  async (info) => {
    const config = {
      headers: {
        Authorization: `Bearer ${info.user.token}`,
      },
    };
    console.log(config);
    console.log(info.movieId);
    const { data } = await axios.post(
      `/api/User/AddMovie/${info.movieId}`,
      {},
      config
    );
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      sessionStorage.removeItem('user');
    },
    removeErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.favorites = action.payload.movies;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'Wrong username or password';
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'Invalid username or password';
    },
    [addUserMovie.pending]: (state, action) => {
      state.loading = true;
    },
    [addUserMovie.fulfilled]: (state, action) => {
      state.loading = false;
      state.favorites = state.favorites.concat(action.payload);
    },
    [deleteUserMovie.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUserMovie.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { signOut, removeErrorMessage } = userSlice.actions;

export default userSlice.reducer;
