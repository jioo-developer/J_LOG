import { screen } from "@testing-library/react";

export function getFormElementHandler(buttonName = "로그인") {
  const form = screen.getByTestId("form-test") as HTMLFormElement;
  const emailInput = screen.getByTestId("emailRequired") as HTMLInputElement;
  const pwInput = screen.getByTestId("passwordRequired") as HTMLInputElement;
  const submitButton = screen
    .getAllByText(buttonName)
    .find((button) => (button as HTMLButtonElement).type === "submit");

  return { form, emailInput, pwInput, submitButton };
}
