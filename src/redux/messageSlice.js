import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from ".././utils/axios";

export const getMessages = createAsyncThunk("Messages/Get", async () => {
  const { data } = await axios.get(`/api/Message/GetMessages`);
  return data;
});

export const sendMessage = createAsyncThunk(
  "Messages/Post",
  async ({ sentBy, sendTo, movieId, message }) => {
    await axios.post(`/api/Message/SendMessage`, {
      sentBy,
      sendTo,
      movieId,
      message,
    });
  }
);

export const markMessageAsRead = createAsyncThunk(
  "Messages/MarkAsRead",
  async (id) => {
    await axios.put(`/api/Message/MarkMessageAsRead/${id}`);
    return id;
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
    [markMessageAsRead.pending]: (state) => {
      state.status = "loading";
    },
    [markMessageAsRead.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.messages.forEach((message) => {
        if (message.id === action.payload) {
          message.read = true;
        }
      });
    },
    [markMessageAsRead.rejected]: (state, action) => {
      state.status = "failed";
      state.messages = action.error.message;
    },
  },
});

export default messageSlice.reducer;
