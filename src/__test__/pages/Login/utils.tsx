import { screen } from "@testing-library/react";

export function getFormElementHandler() {
  const form = screen.getByTestId("login-form") as HTMLFormElement;
  const emailInput = screen.getByTestId("emailRequired") as HTMLInputElement;
  const pwInput = screen.getByTestId("passwordRequired") as HTMLInputElement;
  const submitButton = screen.getByText("로그인") as HTMLButtonElement;

  return { form, emailInput, pwInput, submitButton };
}
