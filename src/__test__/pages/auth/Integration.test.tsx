import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getFormElementHandler } from "../login/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPage from "@/app/auth/Client";

jest.mock("@/apis/auth/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("@/apis/member/mypage/query/useGetNicknameQuery", () => ({
  __esModule: true, // ES 모듈로 인식되도록 설정
  default: jest.fn().mockReturnValue({
    nicknameData: ["사용중인닉네임"], // 모의 데이터 반환
    error: null,
    isLoading: false,
  }),
}));

const onSubmit = jest.fn();

describe("회원가입입 onSubmit 실행시 mutation 호출을 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthPage onSubmit={onSubmit} />
      </QueryClientProvider>
    );
  });
  test("모든 유효성 검사를 통과 하는 지 확인합니다.", async () => {
    const { form, emailInput, pwInput } = getFormElementHandler("회원가입");

    const nickNameInput = screen.getByTestId(
      "nickNameRequired"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(pwInput, { target: { value: "password123" } });
    fireEvent.change(nickNameInput, { target: { value: "aaa" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(pwInput.value).toBe("password123");
    expect(nickNameInput.value).toBe("aaa");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        emailRequired: emailInput.value,
        passwordRequired: pwInput.value,
        nickNameRequired: nickNameInput.value,
      });
    });
  });
});
