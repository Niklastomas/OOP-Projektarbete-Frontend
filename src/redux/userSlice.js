import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));

const initialState = {
  user: userFromSessionStorage,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('api/Account/Login', async (user) => {
  const { data } = await axios.post('/api/Account/Login', user);
  sessionStorage.setItem('user', JSON.stringify(data));
  return data;
});

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
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'Wrong username or password';
    },
  },
});

export const { signOut, removeErrorMessage } = userSlice.actions;

export default userSlice.reducer;
