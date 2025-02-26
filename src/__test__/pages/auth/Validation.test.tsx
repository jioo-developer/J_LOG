import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPage from "@/app/auth/Client";
import { getFormElementHandler } from "../Login/utils";

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

describe("로그인 form에 대한 유효성 검사를 테스트 합니다", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <AuthPage onSubmit={onSubmit} />
        </QueryClientProvider>
      );
    });
  });
  test("form input에 값을 입력하면 올바르게 변경 되는 지 테스트 합니다.", () => {
    const { emailInput, pwInput } = getFormElementHandler("회원가입");

    const nickNameInput = screen.getByTestId(
      "nickNameRequired"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(pwInput, { target: { value: "password123" } });
    fireEvent.change(nickNameInput, { target: { value: "aaa" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(pwInput.value).toBe("password123");
    expect(nickNameInput.value).toBe("aaa");
  });

  test("이메일이 올바른 형식이 아닐 경우, 오류 메시지가 표시되어야 한다", async () => {
    const { form, emailInput } = getFormElementHandler("회원가입");

    // 잘못된 이메일 입력
    fireEvent.change(emailInput, { target: { value: "wrongemail" } });

    // 로그인 버튼 클릭 (폼 제출 시도)
    await act(() => {
      fireEvent.submit(form);
    });

    // 오류 메시지가 표시되는지 확인
    await waitFor(() => {
      const errorMsg = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMsg).toBeInTheDocument();
    });
  });

  test("비밀번호가 8자리 미만일 경우, 오류 메시지가 표시되어야 한다", async () => {
    const { form, pwInput } = getFormElementHandler("회원가입");

    // 짧은 비밀번호 입력
    fireEvent.change(pwInput, { target: { value: "12345" } });

    await act(() => {
      fireEvent.submit(form);
    });

    // 오류 메시지가 표시되는지 확인

    await waitFor(() => {
      const errorMsg = screen.getByText("비밀번호가 짧습니다.");
      expect(errorMsg).toBeInTheDocument();
    });
  });

  test("이미 사용중인 닉네임 일 때 에러 메시지 표시 테스트", async () => {
    const { form } = getFormElementHandler("회원가입");

    const nickNameInput = screen.getByTestId(
      "nickNameRequired"
    ) as HTMLInputElement;

    fireEvent.change(nickNameInput, {
      target: { value: "사용중인닉네임" },
    });

    // 로그인 버튼 클릭 (폼 제출 시도)
    await act(() => {
      fireEvent.submit(form);
    });

    // 오류 메시지가 표시될 때까지 기다리기
    const errorMsg = await screen.findByText("이미 사용중인 닉네임입니다.");
    expect(errorMsg).toBeInTheDocument();
  });
});
