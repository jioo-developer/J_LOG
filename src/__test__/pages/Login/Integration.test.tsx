import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginPage from "@/app/login/Client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFormElementHandler } from "./utils";
import LoginForm from "@/app/login/components/LoginForm";

// Jest Mock

jest.mock("@/apis/login/firebase/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

const onSubmit = jest.fn();

test("onSubmit 실행 시 react-hook-form의 타입의 값을 가지고 mutation을 호출하는 지 테스트합니다.", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm onSubmit={onSubmit} />
    </QueryClientProvider>
  );
  const { form, emailInput, pwInput } = getFormElementHandler();

  fireEvent.change(emailInput, { target: { value: "user@test.com" } });
  fireEvent.change(pwInput, { target: { value: "password123" } });

  fireEvent.submit(form);

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      emailRequired: emailInput.value,
      passwordRequired: pwInput.value,
    });
  });
});
