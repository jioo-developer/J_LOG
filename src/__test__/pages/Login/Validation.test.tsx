import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { getFormElementHandler } from "./utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/app/login/Client";

const onSubmit = jest.fn();

describe("로그인 form에 대한 유효성 검사를 테스트 합니다", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <LoginPage onSubmit={onSubmit} />
        </QueryClientProvider>
      );
    });
  });
  test("form input에 값을 입력하면 올바르게 변경 되는 지 테스트 합니다.", () => {
    const { emailInput, pwInput } = getFormElementHandler();

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(pwInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(pwInput.value).toBe("password123");
  });

  test("이메일이 올바른 형식이 아닐 경우, 오류 메시지가 표시되어야 한다", async () => {
    const { form, emailInput } = getFormElementHandler();

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
    const { form, pwInput } = getFormElementHandler();

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
});
