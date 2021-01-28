import { render } from "@testing-library/react";
import FriendRequest from "../FriendRequest";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

const sentBy = {
  username: "test",
};
const store = mockStore({
  myState: "test",
});

test("renders correctly", () => {
  const { getByText } = render(
    <Provider store={store}>
      <FriendRequest sentBy={sentBy} />
    </Provider>
  );
  getByText("test");
});
