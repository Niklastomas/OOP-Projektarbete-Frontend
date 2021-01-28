import { render, fireEvent } from "@testing-library/react";

import RegisterForm from "../RegisterForm";

test("renders correctly", () => {
  const { queryByText, queryByPlaceholderText } = render(<RegisterForm />);
  queryByText("Email");
  queryByText("Password");
  queryByText("Confirm Password");
  queryByText("Register");
  queryByPlaceholderText("Email");
  queryByPlaceholderText("Password");
  queryByPlaceholderText("Confirm Password");
});

test("Input values updates on change", () => {
  const { queryByPlaceholderText } = render(<RegisterForm />);

  const emailInput = queryByPlaceholderText("Email");
  const passwordInput = queryByPlaceholderText("Password");
  const confirmPasswordInput = queryByPlaceholderText("Confirm Password");

  fireEvent.change(emailInput, { target: { value: "email" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "confirmPassword" },
  });

  expect(emailInput.value).toBe("email");
  expect(passwordInput.value).toBe("password");
  expect(confirmPasswordInput.value).toBe("confirmPassword");
});

test("Valid submit", () => {
  const onSubmit = jest.fn();

  const { queryByPlaceholderText, queryByText } = render(
    <RegisterForm onSubmit={onSubmit} />
  );

  const emailInput = queryByPlaceholderText("Email");
  const passwordInput = queryByPlaceholderText("Password");
  const confirmPasswordInput = queryByPlaceholderText("Confirm Password");
  const button = queryByText("Register");

  fireEvent.change(emailInput, { target: { value: "email" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "password" },
  });
  fireEvent.click(button);

  expect(onSubmit).toBeCalledTimes(1);
});

test("Invalid submit", () => {
  const onSubmit = jest.fn();
  const { queryByText } = render(<RegisterForm onSubmit={onSubmit} />);
  const button = queryByText("Register");

  fireEvent.click(button);

  expect(onSubmit).not.toBeCalled();
});
