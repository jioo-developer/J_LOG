import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFormElementHandler } from "./utils";
import { authService } from "@/lib/firebase";

// Jest Mock

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => ({
    control: () => ({}),
    handleSubmit: () => jest.fn(),
  }),
})),
  jest.mock("@/apis/login/hook/useGetUserQuery", () => ({
    __esModule: true, // ES 모듈로 인식되도록 설정
    default: jest.fn().mockReturnValue({
      data: null, // 모의 데이터 반환
      error: null,
      isLoading: false,
    }),
  }));

jest.mock("@/lib/firebase", () => ({
  authService: {
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock("@/apis/login/hook/useLogoutHook", () => {
  return jest.fn(() => ({
    mutate: jest.fn(async () => {
      await authService.signOut();
    }),
  }));
});

jest.mock("@/apis/login/firebase/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("lucide-react", () => ({
  EyeIcon: (props: any) => <svg {...props} data-testid="eye-icon" />,
  EyeOffIcon: (props: any) => <svg {...props} data-testid="eye-off-icon" />,
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
