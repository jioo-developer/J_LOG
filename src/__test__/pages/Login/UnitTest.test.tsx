import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/app/login/Client";

// Jest Mock

jest.mock("@/apis/login/firebase/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

test("비밀번호 보이기/숨기기 버튼이 정상 작동하는지 확인합니다", () => {
  jest.clearAllMocks();
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
  const pwInput = screen.getByTestId("passwordRequired");
  const pwBlindButton = screen.getByTestId("pwBlind-off");

  // 기본적으로 비밀번호는 숨겨져 있어야 함
  expect(pwInput).toHaveAttribute("type", "password");

  // 눈 아이콘 클릭 -> 비밀번호가 보여야 함
  fireEvent.click(pwBlindButton);
  expect(pwInput).toHaveAttribute("type", "text");

  // 다시 클릭 -> 비밀번호가 다시 숨겨져야 함
  const pwShowButton = screen.getByTestId("pwBlind-on");
  fireEvent.click(pwBlindButton);
  expect(pwInput).toHaveAttribute("type", "password");
});
