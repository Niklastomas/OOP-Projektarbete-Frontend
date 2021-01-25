import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import friendReducer from "./redux/friendSlice";
import messageReducer from "./redux/messageSlice";
import movieReducer from "./redux/movieSlice";

const combinedReducer = combineReducers({
  user: userReducer,
  friend: friendReducer,
  message: messageReducer,
  movie: movieReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/signOut") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
