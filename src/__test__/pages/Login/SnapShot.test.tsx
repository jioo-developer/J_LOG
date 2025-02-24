import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/Client";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFormElementHandler } from "./utils";

// Jest Mock

jest.mock("@/apis/login/firebase/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

describe("로그인 페이지가 정상적으로 렌더링 되었는 지 태스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>
    );
  });
  test("FORM과 관련된 컴포넌트들이 정상적으로 랜더링 되었는 지 테스트 합니다.", () => {
    const { emailInput, pwInput, submitButton } = getFormElementHandler();

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("SNS 로그인 버튼이 정상적으로 랜더링 되었는 지 테스트 합니다.", () => {
    const googleLoginButton = screen.getByTestId("google-login");
    const facebookLoginButton = screen.getByTestId("facebook-login");

    expect(googleLoginButton).toBeInTheDocument();
    expect(facebookLoginButton).toBeInTheDocument();
  });
});
