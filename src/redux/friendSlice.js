import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from ".././utils/axios";

export const getFriends = createAsyncThunk("User/GetFriends", async () => {
  const { data } = await axios.get(`/api/User/GetFriends`);
  return data;
});

export const getUsers = createAsyncThunk("User/GetUsers", async () => {
  const { data } = await axios.get("api/User/GetUsers");
  return data;
});

export const getFriendRequests = createAsyncThunk(
  "User/GetFriendRequests",
  async () => {
    const { data } = await axios.get(`/api/User/GetFriendRequests`);
    return data;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "User/SendFriendRequest",
  async (id) => {
    await axios.post(`api/User/SendFriendRequest/${id}`);
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "User/AcceptFriendRequest",
  async (id) => {
    const { data } = await axios.post(`api/User/AcceptFriendRequest/${id}`);
    return {
      id: id,
      user: data,
    };
  }
);

export const declineFriendRequest = createAsyncThunk(
  "User/DeclineFriendRequest",
  async (id) => {
    await axios.post(`api/User/DeclineFriendRequest/${id}`);
    return id;
  }
);

const initialState = {
  friends: [],
  users: [],
  friendRequests: [],
  status: "idle",
  error: null,
};

const friendSlice = createSlice({
  name: "friends",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getFriends.pending]: (state) => {
      state.status = "loading";
    },
    [getFriends.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.friends = action.payload;
    },
    [getFriends.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getFriendRequests.pending]: (state) => {
      state.status = "loading";
    },
    [getFriendRequests.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.friendRequests = action.payload;
    },
    [getFriendRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [acceptFriendRequest.pending]: (state) => {
      state.status = "loading";
    },
    [acceptFriendRequest.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.friendRequests = state.friendRequests.filter(
        (request) => request.id !== action.payload.id
      );
      console.log(action.payload.user);
      state.friends.push(action.payload.user);
    },
    [acceptFriendRequest.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [declineFriendRequest.pending]: (state) => {
      state.status = "loading";
    },
    [declineFriendRequest.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.friendRequests = state.friendRequests.filter(
        (request) => request.id !== action.payload
      );
    },
    [declineFriendRequest.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [sendFriendRequest.pending]: (state) => {
      state.status = "loading";
    },
    [sendFriendRequest.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [sendFriendRequest.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      // const friendsIDs = new Set(state.friends.map(({ id }) => id));
      state.status = "succeeded";
      // state.users = action.payload.filter(({ id }) => !friendsIDs.has(id));
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default friendSlice.reducer;
