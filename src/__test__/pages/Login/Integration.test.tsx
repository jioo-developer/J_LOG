import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useLogoutHook from "@/apis/login/hook/useLogoutHook";
import { authService } from "@/lib/firebase";
import { getFormElementHandler } from "./utils";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";

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

const onSubmit = jest.fn();

describe("로그인 onSubmit 실행시 mutation 호출을 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage onSubmit={onSubmit} />
      </QueryClientProvider>
    );
  });

  test("form input에 값을 입력하면 올바르게 변경 되는 지 테스트 합니다.", () => {
    const { emailInput, pwInput } = getFormElementHandler();

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(pwInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(pwInput.value).toBe("password123");
  });

  test("onSubmit 실행 시 react-hook-form의 타입의 값을 가지고 호출하는 지 테스트합니다.", async () => {
    const { emailInput, pwInput, submitButton } = getFormElementHandler();

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(pwInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          emailRequired: emailInput.value,
          passwordRequired: pwInput.value,
        },
        expect.anything()
      )
    );
  });
});

describe("로그아웃 로직을 테스트 합니다.", () => {
  test("로그아웃 기능이 성공적으로 호출되는지 테스트 합니다.", async () => {
    const { mutate: logout } = useLogoutHook();
    render(
      <CommonButton theme="none" onClick={logout} testId="logoutButton">
        로그아웃
      </CommonButton>
    );
    fireEvent.click(screen.getByTestId("logoutButton"));

    await waitFor(() => {
      expect(authService.signOut).toHaveBeenCalledTimes(1);
    });
  });
});
