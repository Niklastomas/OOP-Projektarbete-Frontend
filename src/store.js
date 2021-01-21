import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import friendReducer from "./redux/friendSlice";
import messageReducer from "./redux/messageSlice";
import movieReducer from "./redux/movieSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    friend: friendReducer,
    message: messageReducer,
    movie: movieReducer,
  },
});
