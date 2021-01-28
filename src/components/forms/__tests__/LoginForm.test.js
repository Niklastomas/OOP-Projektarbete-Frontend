import { render, fireEvent } from "@testing-library/react";

import LoginForm from "../LoginForm";

test("renders correctly", () => {
  const { queryByText, queryByPlaceholderText } = render(<LoginForm />);
  expect(queryByText("Email")).toBeTruthy();
  expect(queryByText("Password")).toBeTruthy();
  expect(queryByText("Login")).toBeTruthy();
  expect(queryByPlaceholderText("Email")).toBeTruthy();
  expect(queryByPlaceholderText("Password")).toBeTruthy();
});

test("Input values updates on change", () => {
  const { queryByPlaceholderText } = render(<LoginForm />);

  const emailInput = queryByPlaceholderText("Email");
  const passwordInput = queryByPlaceholderText("Password");

  fireEvent.change(emailInput, { target: { value: "email" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  expect(emailInput.value).toBe("email");
  expect(passwordInput.value).toBe("password");
});

test("Valid submit", () => {
  const onSubmit = jest.fn();

  const { queryByText, queryByPlaceholderText } = render(
    <LoginForm onSubmit={onSubmit} />
  );
  const button = queryByText("Login");
  const emailInput = queryByPlaceholderText("Email");
  const passwordInput = queryByPlaceholderText("Password");

  fireEvent.change(emailInput, { target: { value: "email" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(button);

  expect(onSubmit).toBeCalledTimes(1);
});

test("Invalid submit", () => {
  const onSubmit = jest.fn();

  const { queryByText } = render(<LoginForm onSubmit={onSubmit} />);
  const button = queryByText("Login");

  fireEvent.click(button);

  expect(onSubmit).not.toBeCalled();
});
