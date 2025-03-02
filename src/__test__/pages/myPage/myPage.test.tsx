import {
  screen,
  fireEvent,
  waitFor,
  render,
  act,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useNameChangeMutation from "@/apis/member/mypage/nicknameForm/useMutation";
import useImageMutation from "@/apis/member/mypage/profile/useMutation";
import MyPage from "@/app/member/mypage/Client";

jest.mock("@/apis/login/query/useGetUserQuery", () => ({
  __esModule: true, // ES 모듈로 인식
  default: jest.fn().mockReturnValue({
    data: { uid: "테스터" }, // 기본 테스트 데이터
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/apis/member/mypage/nicknameForm/useMutation", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutateAsync: jest.fn(),
  }),
}));

jest.mock("@/apis/member/mypage/profile/useMutation", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

describe("MyPage 페이지를 테스트 테스트합니다.", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <QueryClientProvider client={queryClient}>
        <MyPage />
      </QueryClientProvider>
    );
  });

  test("닉네임 수정 기능을 테스트 합니다", async () => {
    fireEvent.click(screen.getByText("닉네임 수정"));

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MyPage />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      const input = screen.getByPlaceholderText("닉네임을 입력해주세요");
      fireEvent.change(input, { target: { value: "새로운닉네임" } });
      const form = screen.getByTestId("form-test");

      fireEvent.submit(form);
    });

    const { mutateAsync } = useNameChangeMutation();

    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith({
        nickname: "새로운닉네임",
      })
    );
  });

  test("프로필 이미지 업로드 기능이 정상적으로 동작하는지 테스트 합니다", async () => {
    const file = new File(["dummy data"], "test.png", { type: "image/png" });
    const input = screen.getByLabelText("이미지 업로드");

    fireEvent.change(input, { target: { files: [file] } });

    const { mutate } = useImageMutation();

    await waitFor(() => expect(mutate).toHaveBeenCalled());
  });
});
