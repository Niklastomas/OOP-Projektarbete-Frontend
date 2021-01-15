import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
const favoriteMoviesFromSessionStorage = JSON.parse(
  sessionStorage.getItem('favoriteMovies')
);
const friendsFromSessionStorage = JSON.parse(sessionStorage.getItem('friends'));

const initialState = {
  user: userFromSessionStorage,
  favorites: favoriteMoviesFromSessionStorage,
  friends: friendsFromSessionStorage,
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
  const {data: friends} = await axios.get('api/User/GetFriends', config);

  sessionStorage.setItem('user', JSON.stringify(userData));
  sessionStorage.setItem('favoriteMovies', JSON.stringify(userMovies));
  sessionStorage.setItem('friends', JSON.stringify(friends));


  return {
    user: userData,
    movies: userMovies,
    friends: friends
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
      sessionStorage.removeItem('favoriteMovies');
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
      state.friends = action.payload.friends;
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
      sessionStorage.setItem('favoriteMovies', JSON.stringify(state.favorites));
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
      sessionStorage.setItem('favoriteMovies', JSON.stringify(state.favorites));
    },
  },
});

export const { signOut, removeErrorMessage } = userSlice.actions;

export default userSlice.reducer;
