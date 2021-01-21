import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from ".././utils/axios";

export const getMessages = createAsyncThunk("Messages/Get", async () => {
  const { data } = await axios.get(`/api/User/GetMessages`);
  return data;
});

export const sendMessage = createAsyncThunk(
  "Messages/Post",
  async ({ sendTo, movieId, message }) => {
    console.log(message);
    await axios.post(`/api/User/SendMessage`, { sendTo, movieId, message });
  }
);

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getMessages.pending]: (state) => {
      state.status = "loading";
    },
    [getMessages.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
    },
    [getMessages.rejected]: (state, action) => {
      state.status = "failed";
      state.messages = action.error.message;
    },
    [sendMessage.pending]: (state) => {
      state.status = "loading";
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [sendMessage.rejected]: (state, action) => {
      state.status = "failed";
      state.messages = action.error.message;
    },
  },
});

export default messageSlice.reducer;
