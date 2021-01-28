import { render } from "@testing-library/react";
import FriendList from "../FriendList";

test("renders all the items with the correct name", () => {
  const testData = [
    { id: 1, username: "test1" },
    { id: 2, username: "test2" },
  ];
  const { getAllByTestId } = render(<FriendList friends={testData} />);
  const element = getAllByTestId("friend");

  expect(element[0].textContent).toBe("test1");
  expect(element[1].textContent).toBe("test2");
  expect(element.length).toBe(2);
});

test("renders correct if friends is empty", () => {
  const { getByText } = render(<FriendList />);

  getByText("Friend list is empty");
});
