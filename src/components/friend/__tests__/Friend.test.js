import { render } from "@testing-library/react";

import Friend from "../Friend";

test("renders correctly", () => {
  const { getByText } = render(<Friend name="test" />);

  getByText("test");
});
