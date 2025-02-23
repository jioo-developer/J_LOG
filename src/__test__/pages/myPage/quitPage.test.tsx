import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import isCredential from "@/app/member/quit/handler/credentialHandler";
import QuitPage from "@/app/member/quit/page";
import originDeleteHandler from "@/app/member/quit/handler/originquitHandler";

jest.mock("@/apis/login/hook/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터", displayName: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));
jest.mock("@/apis/member/quit/useMutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock("@/app/member/quit/handler/credentialHandler");
jest.mock("@/app/member/quit/handler/originquitHandler");
jest.mock("@/app/member/quit/handler/socialquitHandler");

const queryClient = new QueryClient();

describe("QuitPage 페이지의 기능을 테스트 합니다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("회원 탈퇴 모달이 정상적으로 렌더링 되는 지 테스트 합니다다.", async () => {
    (isCredential as jest.Mock).mockReturnValue("origin");

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <QuitPage />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("정말로 회원탈퇴를 진행할까요?")
      ).toBeInTheDocument();
      expect(screen.getByText("취소")).toBeInTheDocument();
      expect(screen.getByText("확인")).toBeInTheDocument();
    });
  });

  test("소셜 로그인 일 때 인풋이 출력하지 않는 것에 대한한 테스트를 진행 합니다", async () => {
    (isCredential as jest.Mock).mockReturnValue("sosial");

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <QuitPage />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText("회원탈퇴를 위해 비밀번호를 입력해주세요")
      ).not.toBeInTheDocument();
    });
  });

  test("일반 로그인 일 때 인풋이 출력 하는 지 테스트 합니다.", async () => {
    (isCredential as jest.Mock).mockReturnValue("origin");

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <QuitPage />
        </QueryClientProvider>
      );
    });
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("회원탈퇴를 위해 비밀번호를 입력해주세요")
      ).toBeInTheDocument();
    });
  });

  test("일반 사용자 일때 비밀번호 입력 후 확인을 누를 시 정상적으로 출력 하는 지 테스트 합니다.", async () => {
    (isCredential as jest.Mock).mockReturnValue("origin");

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <QuitPage />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      const form = screen.getByTestId("form-test");
      const passwordInput = screen.getByPlaceholderText(
        "회원탈퇴를 위해 비밀번호를 입력해주세요"
      );
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });

      fireEvent.submit(form);
      expect(originDeleteHandler).toHaveBeenCalled();
    });
  });
});
