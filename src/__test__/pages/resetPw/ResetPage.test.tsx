import ResetPwPage from "@/app/resetPw/page";
import { authService } from "@/lib/firebase";
import { popuprHandler } from "@/utils/popupHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { sendPasswordResetEmail } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  sendPasswordResetEmail: jest.fn(),
}));

describe("비밀번호 찾기 페이지에 대한 기능을 테스트합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ResetPwPage />
      </QueryClientProvider>
    );
  });
  test("이메일 입력 필드가 렌더링된다", () => {
    // 이메일 입력 필드가 있는지 확인
    const emailInput = screen.getByTestId("emailRequired");
    expect(emailInput).toBeInTheDocument();
  });

  test("유효한 이메일을 입력했을 때, 이메일 리셋 메일 전송 함수가 호출되는 지 테스트합니다.", async () => {
    (sendPasswordResetEmail as jest.Mock).mockReturnValue(true);
    const emailInput = screen.getByTestId("emailRequired");
    const form = screen.getByTestId("form-test");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    await act(() => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        authService,
        "test@example.com"
      );
    });

    expect(popuprHandler).toHaveBeenCalledWith({
      message: "입력하신 메일로 비밀번호 안내 해드렸습니다.",
    });
  });

  test("올바르지 않은 이메일 형식을 입력하면 에러 메시지가 출력 되는 지 테스트합니다.", async () => {
    const form = screen.getByTestId("form-test");
    const emailInput = screen.getByTestId("emailRequired");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    await act(() => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const errorMsg = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
